<!--
  Author: arthurzakharov,
  Date: 24.12.2019

  Usage: For the moment component emits "set" event with JS new Date object or "close" with no payload,
  Component has one props for the moment <Boolean>"isDateOnly" this will send "set" event straight after
  click on date selection. Some refactor is needed. No router, no vuex, no third part NPM packages
-->

<template>
  <div class="wrap">
    <div class="picker">
      <HeadDate
        v-if="mode < 3"
        :year="year"
        :month="MONTH_SET[month]"
        :week-day="WEEK_SET[day]"
        :date="date"
      />
      <HeadTime
        v-else
        :hours="hour"
        :minutes="minute"
        :is-pm="pm"
        @modeUpdate="handleModeUpdateFromTimeHeader"
      />
      <Switcher
        v-if="mode === 1 || mode === 2"
        :mode="MODE_SET[mode]"
        :month="MONTH_SET[month]"
        :year="year"
        @toggleMode="handleToggleMode"
        @back="handleSwitchBack"
        @forward="handleSwitchForward"
      />
      <Year
        v-if="mode === 0"
        :selected-year="year"
        @year="setYear"
      />
      <Month
        v-else-if="mode === 1"
        :name="MONTH_SET"
        :selected-moth="month"
        @month="setMonth"
      />
      <Day
        v-else-if="mode === 2"
        :number="daysInMonth"
        :position="firstDayOfMonthPosition"
        :name="weekDaysShortNamesSet"
        :selected-day="date"
        @day="setDay"
      />
      <Time
        v-else
        :mode="mode"
        :is-pm="pm"
        @mode="setMode"
        @hour="setHour"
        @minute="setMinute"
        @pm="setPmState"
        @update-can-finish="handleUpdateCanFinish"
      />
      <Buttons
        v-if="mode >= 2"
        :mode="mode"
        :can-finish="canFinish"
        @calendar="handleCalendarClick"
        @cancel="handleCancelClick"
        @ok="handleOkClick"
      />
    </div>
  </div>
</template>

<script>
import HeadDate from './HeadDate.vue';
import Switcher from './Switcher.vue';
import Year from './Year.vue';
import Month from './Month.vue';
import Day from './Day.vue';
import Time from './Time.vue';
import HeadTime from './HeadTime.vue';
import Buttons from './Buttons.vue';

export default {
  name: 'Picker',
  components: {
    Buttons,
    HeadTime,
    Time,
    Day,
    Month,
    HeadDate,
    Switcher,
    Year
  },
  props: {
    isDateOnly: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: () => ({
    MODE_SET: {
      0: 'year',
      1: 'month',
      2: 'date',
      3: 'hour',
      4: 'minute'
    },
    MONTH_SET: {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December'
    },
    WEEK_SET: {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday'
    },
    todayStamp: null,
    todayDate: null,
    todayMonth: null,
    todayYear: null,
    daysInMonth: null,
    date: null,
    day: null,
    month: null,
    year: null,
    hour: null,
    minute: null,
    pm: true,
    canFinish: true,
    mode: 2
  }),
  methods: {
    getNumberOfDaysInMonth() {
      const d = new Date(this.todayStamp.getFullYear(), this.todayStamp.getMonth() + 1, 0);
      return d.getDate();
    },
    setDay(date) {
      this.date = date;
    },
    setMonth(month) {
      this.month = month;
      this.mode++;
    },
    setYear(year) {
      this.year = year;
      this.mode++;
    },
    setHour(hour) {
      this.hour = hour;
    },
    setMinute(minute) {
      this.minute = minute;
    },
    setPmState(isPm) {
      this.pm = isPm;
    },
    setMode(mode) {
      this.mode = mode;
    },
    handleOkClick() {
      if (this.isDateOnly) {
        const date = new Date(this.year, this.month, this.date);
        this.$emit('set', date);
      } else if (!this.isDateOnly && this.mode === 2) {
        this.mode++;
      } else {
        const hours = this.pm ? this.hour + 12 : this.hour;
        const date = new Date(
          this.year,
          this.month,
          this.date,
          hours,
          this.minute
        );
        this.$emit('set', date);
      }
    },
    handleCancelClick() {
      this.$emit('close');
    },
    handleCalendarClick() {
      this.mode = 2;
    },
    handleToggleMode() {
      switch (this.mode) {
        case 2:
          this.mode--;
          break;
        case 1:
          this.mode--;
          break;
        case 0:
          this.mode = 2;
      }
    },
    handleSwitchBack() {
      switch (this.mode) {
        case 2:
          if (this.month === 0) {
            this.month = 11;
            this.year--;
          } else {
            this.month--;
          }
          break;
        case 1:
          if (this.year === this.todayYear - 100) return;
          this.year--;
      }
    },
    handleSwitchForward() {
      switch (this.mode) {
        case 2:
          if (this.month === 11) {
            this.month = 0;
            this.year++;
          } else {
            this.month++;
          }
          break;
        case 1:
          if (this.year === this.todayYear + 100) return;
          this.year++;
      }
    },
    handleModeUpdateFromTimeHeader(mode) {
      this.mode = mode;
    },
    handleUpdateCanFinish(val) {
      this.canFinish = val;
    }
  },
  computed: {
    firstDayOfMonthPosition() {
      return new Date(this.year, this.month - 2, 1).getDay();
    },
    weekDaysShortNamesSet() {
      return Object.values(this.WEEK_SET).map(i => i.substring(0, 1).toUpperCase());
    }
  },
  created() {
    this.todayStamp = new Date();
    this.todayDate = this.todayStamp.getDate();
    this.todayMonth = this.todayStamp.getMonth();
    this.todayYear = this.todayStamp.getFullYear();
    this.daysInMonth = this.getNumberOfDaysInMonth();
    this.date = this.todayDate;
    this.day = this.todayStamp.getDay();
    this.month = this.todayMonth;
    this.year = this.todayYear;
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/var.scss";

.wrap {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba($c-black, 0.25);
}

.picker {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 290px;
  background-color: $c-white;
  box-shadow: 0 0 4px 0 rgba($c-black, 0.3);
}
</style>
