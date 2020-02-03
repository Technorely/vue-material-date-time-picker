<template>
  <div class="vmdtp_header">
    <p class="vmdtp_text vmdtp_text--year">{{ year }}</p>
    <p class="vmdtp_text vmdtp_text--month">{{ dateText }}</p>
  </div>
</template>

<script>
export default {
  name: 'HeadDate',
  props: {
    year: {
      type: Number,
      required: true
    },
    date: {
      type: Number,
      required: true
    },
    month: {
      type: String,
      required: true
    },
    weekDay: {
      type: String,
      required: true
    }
  },
  computed: {
    dateText () {
      const shrinkWeekDay = this.weekDay.substr(0, 3)
      const shrinkMonth = this.month.substr(0, 3)
      return `${shrinkWeekDay}, ${shrinkMonth} ${this.date}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/var";

.vmdtp_header {
  background-color: $c-blue-darken;
  color: $c-white;
  padding: 16px;
}

.vmdtp_text {
  margin: 0;
  display: block;
  font-family: sans-serif;
  text-align: left;
  overflow: hidden;
  &--year {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 8px;
  }
  &--month {
    font-size: 34px;
    font-weight: 500;
    padding-bottom: 8px;
  }
}
</style>
