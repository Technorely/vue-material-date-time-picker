<template>
  <div class="header">
    <p class="text text--year">{{ year }}</p>
    <p class="text text--month">{{ dateText }}</p>
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
    dateText() {
      const shrinkWeekDay = this.weekDay.substr(0, 3);
      const shrinkMonth = this.month.substr(0, 3);
      return `${shrinkWeekDay}, ${shrinkMonth} ${this.date}`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/var";

.header {
  background-color: $c-blue;
  color: $c-white;
  padding: 16px;
}

.text {
  margin: 0;
  display: block;
  font-family: "Roboto", sans-serif;
  text-align: left;
  overflow: hidden;
  &--year {
    font-size: 14px;
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
