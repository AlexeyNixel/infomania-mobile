<template>
  <el-calendar ref="calendar" class="calendar">
    <template class="calendar-header" #header="{ date }">
      <div class="calendar-header__title">{{ date }}</div>
    </template>
    <template #date-cell="dateCell">
      <div v-if="whatADay(dateCell.data.day) === 'eventDay'" class="event-day">
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
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useBillboardStore } from '@/stores/billboardStore';
import type { BillboardType } from '@/models/baseModels';
import moment from 'moment';
import type { CalendarDateType, CalendarInstance } from 'element-plus';

const calendar = ref<CalendarInstance>();

const value = ref(new Date());
const eventsDateArray = ref<Array<string>>([]);

const billboardStore = useBillboardStore();
const billboards = ref<BillboardType[]>();

const startSwipe = ref<number>(0);
const endSwipe = ref<number>(0);
const timer = ref();

const handleSwipeMonth = () => {
  console.log(startSwipe.value - endSwipe.value);
  if (startSwipe.value - endSwipe.value > 12) {
    selectDate('next-month');
  } else if (startSwipe.value - endSwipe.value < -12) {
    selectDate('prev-month');
  }
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
  });
};

onMounted(async () => {
  const target = document.querySelector('.calendar')!;
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

  const firstDate = moment(new Date()).startOf('month').format('YYYY-MM-DD');
  const lastDate = moment(new Date()).endOf('month').format('YYYY-MM-DD');
  await fetchData(firstDate, lastDate);
});
</script>

<style scoped lang="scss">
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
</style>
