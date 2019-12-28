<template>
  <div class="header">
    <span
      :class="{active: mode === 3}"
      class="text text--pointer"
      @click="$emit('modeUpdate', MODE.HOUR)"
    >{{ hour }}</span>
    <span class="text">:</span>
    <span
      :class="{active: mode === 4}"
      class="text text--pointer"
      @click="$emit('modeUpdate', MODE.MINUTE)"
    >{{ minute }}</span>
    <span class="text text--sm">{{ pmOrAm }}</span>
  </div>
</template>

<script>
import { MODE } from '../constants'

export default {
  name: 'HeadTime',
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
    },
    mode: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    MODE
  }),
  computed: {
    hour () {
      return this.hours !== null ? this.hours : '--'
    },
    minute () {
      let minutes = this.minutes !== null ? this.minutes : '--'
      if (Number.isInteger(minutes) && minutes < 10) minutes = `0${minutes}`
      return minutes
    },
    pmOrAm () {
      return this.isPm ? 'PM' : 'AM'
    }
  }
}
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
  opacity: 0.5;
  &.active {
    opacity: 1;
  }
  &--pointer {
    cursor: pointer;
  }
  &--sm {
    margin-left: 8px;
    padding-bottom: 4px;
    font-size: 24px;
    line-height: 24px;
    font-weight: 400;
    opacity: 1;
  }
}
</style>
