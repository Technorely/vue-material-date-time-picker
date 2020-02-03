<template>
  <div class="vmdtp_header">
    <span
      :class="{active: mode === 3}"
      class="vmdtp_text vmdtp_text--pointer"
      @click.prevent="$emit('modeUpdate', MODE.HOUR)"
    >{{ hour }}</span>
    <span class="vmdtp_text">:</span>
    <span
      :class="{active: mode === 4, disabled: isOnlyHour}"
      class="vmdtp_text vmdtp_text--pointer"
      @click.prevent="$emit('modeUpdate', MODE.MINUTE)"
    >{{ minute }}</span>
    <span class="vmdtp_text vmdtp_text--sm">{{ pmOrAm }}</span>
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
    isOnlyHour: {
      type: Boolean,
      default: false,
      required: false
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

.vmdtp_header {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  background-color: $c-blue-darken;
  color: $c-white;
  padding: 16px;
}

.vmdtp_text {
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
    &.disabled {
      pointer-events: none;
      cursor: not-allowed;
    }
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
