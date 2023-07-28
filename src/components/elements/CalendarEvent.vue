<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useBillboardStore } from '@/stores/billboardStore';
import { onMounted, ref, watch } from 'vue';
import moment from 'moment';
import CarouselTemplate from '@/components/UI/CarouselTemplate.vue';
import type { CalendarDateType } from 'element-plus';
import type { BillboardType } from '@/models/baseModels';
import { AffichePlaces } from '@/constants/eventPlace';

const billboardStore = useBillboardStore();
const billboards = ref<BillboardType[]>();

const events = ref<string[]>([]);
const place = AffichePlaces

const startSwipe = ref<number>(0);
const endSwipe = ref<number>(0);
const timer = ref();

const calendar = ref<any>();

const { isCalendar } = storeToRefs(billboardStore);
const { currentEvent } = storeToRefs(billboardStore);

const handleSwipeMonth = () => {
  if (startSwipe.value - endSwipe.value > 12) {
    selectDate('next-month');
  } else if (startSwipe.value - endSwipe.value < -12) {
    selectDate('prev-month');
  }
};

const selectDate = (val: CalendarDateType) => {
  if (!calendar.value) return;

  calendar.value.selectDate(val);
  const fromDate = moment(calendar.value.selectedDay.$d)
    .startOf('month')
    .format('YYYY-MM-DD');
  const toDate = moment(calendar.value.selectedDay.$d)
    .endOf('month')
    .format('YYYY-MM-DD');
  fetchBillboards(fromDate, toDate);
};

const eventCheck = (date: string) => {
  if (moment(date).locale('ru').format('dd') === 'пн') return 'offDay';
  else if (events.value.includes(date)) return 'eventDay';
  else return 'regularDay';
};

const fetchBillboards = async (fromDate: string, toDate: string) => {
  billboards.value = await billboardStore.getBillboardsByDate(
    fromDate,
    toDate,
    {
      pageSize: 60,
      orderBy: 'eventDate',
    },
  );
  billboards.value?.forEach((item) =>
    events.value?.push(moment(item.eventDate).format('YYYY-MM-DD')),
  );
};

const handleFetchEvent = async (date: string) => {
  currentEvent.value = await billboardStore.getBillboards({
    searchByField: `eventDate=${date}T00:00:00.000Z`,
  });
  isCalendar.value = !isCalendar.value;
};

onMounted(async () => {
  const fromDate: string = moment(new Date())
    .startOf('month')
    .format('YYYY-MM-DD');
  const toDate: string = moment(new Date()).endOf('month').format('YYYY-MM-DD');
  await fetchBillboards(fromDate, toDate);

  const currentDate = moment(new Date()).format('YYYY-MM-DD');

  currentEvent.value = await billboardStore.getBillboards({
    searchByField: `eventDate=${currentDate}T00:00:00.000Z`,
  });
});

watch(isCalendar, () => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      const target = document.querySelector('.calendar');
      resolve(target);
    }, 350);
  });

  promise.then((target: Document) => {
    target.addEventListener('touchstart', (e: any) => {
      startSwipe.value = e.touches[0].clientX;
    });
    target.addEventListener('touchmove', (e: any) => {
      if (timer.value) return;
      timer.value = setTimeout(() => {
        timer.value = null;
        endSwipe.value = e.touches[0].clientX;
        handleSwipeMonth();
      }, 200);
    });
  });
});
</script>

<template>
  <div class="date-picker" @click="isCalendar = !isCalendar">
    <div v-if="currentEvent.length > 0" class='date-picker__content'>
      <div class='date-picker__day'>
        {{ moment(currentEvent[0].eventDate).format('DD') }}
        {{ moment(currentEvent[0].eventDate).format('dd') }}
      </div>
      <div class='date-picker__year'>
        {{ moment(currentEvent[0].eventDate).format('MMM') }}
        {{ moment(currentEvent[0].eventDate).format('YYYY') }}
      </div>
    </div>

  </div>
  <Transition name="fade" mode="out-in">
    <el-calendar v-if="isCalendar" ref="calendar" class="calendar">
      <template #date-cell="dateCell">
        <div
          class="calendar-day calendar-day_event"
          v-if="eventCheck(dateCell.data.day) === 'eventDay'"
          @click="handleFetchEvent(dateCell.data.day)"
        >
          {{ dateCell.data.day.slice(-2) }}
        </div>
        <div
          class="calendar-day calendar-day_off"
          v-else-if="eventCheck(dateCell.data.day) === 'offDay'"
        >
          {{ dateCell.data.day.slice(-2) }}
        </div>
        <div class="calendar-day calendar-day_regular" v-else>
          {{ dateCell.data.day.slice(-2) }}
        </div>
      </template>
    </el-calendar>
    <div v-else>
      <carousel-template id="event-content" height="350px">
        <el-carousel-item
          v-for="item in currentEvent"
          :key="item.title"
          class="event-content"
        >
          <div class="event-content__title">{{ item.title }}</div>
          <div class="event-content__desc" v-html="item.desc"></div>
          <div class="event-content__place">{{place[item.eventPlace]}}</div>
        </el-carousel-item>
      </carousel-template>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.date-picker {
  padding: 10px;
  background: var(--element-bg-color);
  border-radius: var(--border-radius-size);
  margin-bottom: 1vh;

  &__content {
    display: flex;
    justify-content: space-between;
  }
}

.event-content {
  background: var(--element-bg-color);
  padding: 5px;
  border-radius: var(--border-radius-size);

  &__title {
    font-size: var(--title-font-size);
    margin-bottom: 1vh;
  }

  &__desc {
    font-size: var(--regular-font-size);
  }
}

.calendar-day {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  &_event {
    border: 2px solid blue;
  }

  &_off {
    border: 2px solid orangered;
  }
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
  transform: translateY(30px);
  opacity: 0;
}
</style>
