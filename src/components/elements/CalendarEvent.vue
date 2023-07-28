<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useBillboardStore } from '@/stores/billboardStore';
import type { BillboardType } from '@/models/baseModels';
import moment from 'moment';
import type { CalendarDateType, CalendarInstance } from 'element-plus';
import CarouselTemplate from '@/components/UI/CarouselTemplate.vue';

const billboardStore = useBillboardStore();

const currentEvent = ref<Array<BillboardType>>([]);
const calendar = ref<CalendarInstance>();
const isCalendar = ref<boolean>(false);
const eventsDateArray = ref<Array<string>>([]);
const billboards = ref<BillboardType[]>();

const startSwipe = ref<number>(0);
const endSwipe = ref<number>(0);
const timer = ref();
const target = ref();

const handleSwipeMonth = () => {
  if (startSwipe.value - endSwipe.value > 12) {
    selectDate('next-month');
  } else if (startSwipe.value - endSwipe.value < -12) {
    selectDate('prev-month');
  }
};

const handleOpenEvent = (slug: string) => {
  console.log(slug);
};

const selectDate = (val: CalendarDateType) => {
  if (!calendar.value) return;

  calendar.value.selectDate(val);
  const firstDate = moment(calendar.value.selectedDay.$d)
    .startOf('month')
    .format('YYYY-MM-DD');
  const lastDate = moment(calendar.value.selectedDay.$d)
    .endOf('month')
    .format('YYYY-MM-DD');
  fetchData(firstDate, lastDate);
};

const whatADay = (date: string) => {
  if (moment(date).locale('ru').format('dd') === 'пн') {
    return 'dayOff';
  } else if (eventsDateArray.value.includes(`${date}T00:00:00.000Z`)) {
    return 'eventDay';
  } else return 'regularDay';
};

const fetchData = async (firstDate: string, lastDate: string) => {
  billboards.value = await billboardStore.getBillboards({
    fromDate: `${firstDate}T00:00:00.000Z`,
    toDate: `${lastDate}T00:00:00.000Z`,
    pageSize: 60,
    orderBy: 'eventDate',
  });

  billboards.value?.forEach((item) => {
    eventsDateArray.value?.push(item.eventDate);
    if (moment(item.eventDate).format('YYYY-MM-DD') === '2023-07-29')
      currentEvent.value.push(item);
  });
};

watch(isCalendar, () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      target.value = document.querySelector('.calendar')!;
      resolve(null);
    }, 350);
  });

  promise.then(() => {
    target.value.addEventListener('touchstart', (e: any) => {
      startSwipe.value = e.touches[0].clientX;
    });

    target.value.addEventListener('touchmove', (e: any) => {
      if (timer.value) return;
      timer.value = setTimeout(() => {
        timer.value = null;
        endSwipe.value = e.touches[0].clientX;
        handleSwipeMonth();
      }, 200);
    });
  });
});

const handleEventCheck = async (date: string) => {
  billboards.value = await billboardStore.getBillboards({
    searchByField: `eventDate=${date}T00:00:00.000Z`,
  });
  console.log(billboards.value);
  currentEvent.value.push(billboards.value);
};

onMounted(async () => {
  const firstDate = moment(new Date()).startOf('month').format('YYYY-MM-DD');
  const lastDate = moment(new Date()).endOf('month').format('YYYY-MM-DD');
  await fetchData(firstDate, lastDate);
});
</script>

<template>
  <div class="date-picker" @click="isCalendar = !isCalendar">
    <el-date-picker
      class="date-picker__btn"
      disabled
      type="date"
      placeholder="Pick a day"
      style="width: 100%"
    />
  </div>
  <Transition name="fade" :duration="300" mode="out-in">
    <el-calendar ref="calendar" class="calendar" v-if="isCalendar">
      <template class="calendar-header" #header="{ date }">
        <div class="calendar-header__title">{{ date }}</div>
      </template>
      <template #date-cell="dateCell">
        <div
          v-if="whatADay(dateCell.data.day) === 'eventDay'"
          class="event-day"
          @click="handleEventCheck(dateCell.data.day)"
        >
          {{ dateCell.data.day.slice(-2) }}
        </div>
        <div
          v-else-if="whatADay(dateCell.data.day) === 'dayOff'"
          class="date-off"
        >
          {{ dateCell.data.day.slice(-2) }}
        </div>
        <div
          v-else-if="whatADay(dateCell.data.day) === 'regularDay'"
          class="regular-day"
        >
          {{ dateCell.data.day.slice(-2) }}
        </div>
      </template>
    </el-calendar>

    <div v-else-if="currentEvent.length > 0" class="event">
      <carousel-template id="eventId">
        <el-carousel-item v-for="item in currentEvent" :key="item">
          <div class="event__title">{{ item.title }}</div>
          <div class="event__content" v-html="item.desc"></div>
          <div class="event__place">{{ item.eventDate }}</div>
        </el-carousel-item>
      </carousel-template>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.date-picker {
  margin: 1vh 0;
}

.date-picker-btn {
  background: var(--element-bg-color);
  margin: 1vh 0;
}

:deep(.el-input.is-disabled .el-input__wrapper) {
  box-shadow: none;
  border-radius: 10px;
}

.event {
  height: 40vh;
  background: var(--element-bg-color);
  border-radius: var(--border-radius-size);
  padding: 10px;
  font-size: var(--regular-font-size);
  text-align: left !important;

  &__title {
    font-size: var(--title-font-size);
    margin-bottom: 1vh;
  }
}

.event-day {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid #0d4cd3;
  border-radius: 6px;
}

.date-off {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid orangered;
  border-radius: 6px;
}

:deep(.el-calendar__body) {
  padding: 0;
}

:deep(.el-calendar-table .el-calendar-day) {
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px !important;
  width: 100% !important;
  padding: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
