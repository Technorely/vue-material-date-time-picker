<template>
  <div class="header">
    <span class="text text--pointer" @click="$emit('modeUpdate', 3)">{{ hour }}</span>
    <span class="text">:</span>
    <span class="text text--pointer" @click="$emit('modeUpdate', 4)">{{ minute }}</span>
    <span class="text text--sm">{{ pmAm }}</span>
  </div>
</template>

<script>
export default {
  name: 'PickerHeaderTime',
  props: {
    hours: {
      type: Number | Object,
      required: true
    },
    minutes: {
      type: Number | Object,
      required: true
    },
    isPm: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    hour() {
      return this.hours !== null ? this.hours : '--';
    },
    minute() {
      let minutes = this.minutes !== null ? this.minutes : '--';
      if (Number.isInteger(minutes) && minutes < 10) minutes = `0${minutes}`;
      return minutes;
    },
    pmAm() {
      return this.isPm ? 'PM' : 'AM';
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/var";

.header {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  background-color: $c-blue;
  color: $c-white;
  padding: 16px;
}

.text {
  margin: 0;
  font-family: "Roboto", sans-serif;
  font-size: 70px;
  line-height: 70px;
  font-weight: 500;
  text-align: right;
  &--pointer {
    cursor: pointer;
  }
  &--sm {
    margin-left: 8px;
    padding-bottom: 4px;
    font-size: 24px;
    line-height: 24px;
    font-weight: 400;
  }
}
</style>
