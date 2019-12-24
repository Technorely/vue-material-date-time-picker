<template>
  <div class="body">
    <div class="clock">
      <ul
        class="items"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
      >
        <li
          v-for="clockItem in clockItems"
          :key="`${clockItem}-clockItem`"
          class="item"
        >
          {{ clockItem }}
        </li>
      </ul>
      <div class="center-point"></div>
      <div class="arrow" :style="{transform: `rotate(${degree}deg)`}"></div>
      <button
        class="button button--left"
        :class="{active: !isPm}"
        @click="handlePmChange(false)"
      >AM</button>
      <button
        class="button button--right"
        :class="{active: isPm}"
        @click="handlePmChange(true)"
      >PM</button>
    </div>
  </div>
</template>

<script>
import { MODE } from '../constants';

export default {
  name: 'Time',
  props: {
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
    MODE,
    isPressed: false,
    XC: null,
    YC: null,
    degree: 1,
    hours: null,
    minutes: null
  }),
  watch: {
    degree(v) {
      if (this.isHourMode) {
        this.hours = Math.floor(v / 30);
        this.$emit('hour', this.hours);
      }
      if (!this.isHourMode) {
        this.minutes = Math.floor(v / 6);
        this.$emit('minute', this.minutes);
      }
    },
    hours: {
      immediate: true,
      handler(v) {
        const areHoursSet = v !== null;
        const areMinutesSet = this.minutes !== null;
        return (areHoursSet && areMinutesSet)
          ? this.$emit('update-can-finish', true)
          : this.$emit('update-can-finish', false);
      }
    },
    minutes: {
      immediate: true,
      handler(v) {
        const areHoursSet = this.hours !== null;
        const areMinutesSet = v !== null;
        return (areHoursSet && areMinutesSet)
          ? this.$emit('update-can-finish', true)
          : this.$emit('update-can-finish', false);
      }
    }
  },
  methods: {
    handleMouseDown() {
      this.isPressed = true;
    },
    handleMouseUp() {
      this.isPressed = false;
      if (this.isHourMode) {
        this.$emit('mode', this.MODE.MINUTE);
      }
    },
    handleMouseMove(event) {
      if (this.isPressed) {
        this.XC = event.offsetX;
        this.YC = event.offsetY;
        this.calculateDeg();
      }
    },
    handlePmChange(mode) {
      this.$emit('pm', mode);
      this.$emit('hour', this.hours);
    },
    calculateDeg() {
      const XA = 125;
      const YA = 125;
      const XB = 125;
      const YB = 0;
      const XC = this.XC;
      const YC = this.YC;
      const vector_AB = [XB - XA, YB - YA];
      const vector_AC = [XC - XA, YC - YA];
      const fractionUpperPart = (vector_AB[0] * vector_AC[0]) + (vector_AB[1] * vector_AC[1]);
      const fractionLowerPart_0 = Math.pow(vector_AB[0], 2) + Math.pow(vector_AB[1], 2);
      const fractionLowerPart_1 = Math.pow(vector_AC[0], 2) + Math.pow(vector_AC[1], 2);
      const fractionLowerPart = Math.sqrt(fractionLowerPart_0) * Math.sqrt(fractionLowerPart_1);
      const arcCosARadians = Math.acos(fractionUpperPart / fractionLowerPart);
      const xRight = XC >=0 && XC < 125;
      const xLeft = XC >= 125 && XC <= 250;
      const yTop = YC >= 0 && YC < 125;
      const yBottom = YC >= 125 && YC <= 250;
      if (xLeft && (yTop || yBottom)) this.degree = Math.floor((180 / Math.PI) * arcCosARadians);
      if (xRight && (yTop || yBottom)) this.degree = 360 - Math.floor((180 / Math.PI) * arcCosARadians);
    }
  },
  computed: {
    isHourMode() {
      return this.mode === this.MODE.HOUR;
    },
    clockItems() {
      if (this.isHourMode) {
        return Array.from({length: 12}, (v, k) => k + 1);
      } else {
        const arr = Array.from({length: 12}, (v, k) => k * 5);
        arr.push(arr.shift());
        return arr;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/var";

.body {
  height: 290px;
  overflow: auto;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clock {
  position: relative;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background-color: $c-gray;
  .center-point {
    position: absolute;
    z-index: 10;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: rgba($c-blue, 0.75);
  }
  .arrow {
    pointer-events: none;
    height: calc(50% - 36px);
    width: 4px;
    bottom: 50%;
    left: calc(50% - 2px);
    transform-origin: center bottom;
    position: absolute;
    z-index: 10;
    background-color: rgba($c-blue, 0.75);
    &:before {
      display: block;
      content: '';
      position: absolute;
      left: -15px;
      top: -32px;
      z-index: 10;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: rgba($c-blue, 0.75);
      cursor: grab;
    }
  }
  .items {
    position: absolute;
    z-index: 11;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0;
    margin: 0;
    list-style: none;
    border-radius: 50%;
    background-color: transparent;
  }
  .item {
    pointer-events: none;
    position: absolute;
    z-index: 1;
    left: 50%;
    top: 50%;
    padding: 0;
    margin: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    font-weight: 500;
    transform: translate(-50%, -50%);
    color: $c-black;
    border-radius: 50%;
    &:nth-child(1) { transform: translate(135%, -345%) }
    &:nth-child(2) { transform: translate(255%, -220%) }
    &:nth-child(3) { transform: translate(300%, -50%) }
    &:nth-child(4) { transform: translate(255%, 135%) }
    &:nth-child(5) { transform: translate(130%, 255%) }
    &:nth-child(6) { transform: translate(-50%, 300%) }
    &:nth-child(7) { transform: translate(-235%, 250%) }
    &:nth-child(8) { transform: translate(-350%, 130%) }
    &:nth-child(9) { transform: translate(-400%, -50%) }
    &:nth-child(10) { transform: translate(-345%, -230%) }
    &:nth-child(11) { transform: translate(-220%, -350%) }
    &:nth-child(12) { transform: translate(-50%, -400%) }
  }
}

.button {
  position: absolute;
  z-index: 1;
  bottom: 0;
  background-color: transparent;
  border: none;
  opacity: 0.6;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
  color: $c-blue;
  outline: none;
  &--left {
    left: 0;
  }
  &--right {
    right: 0;
  }
  &.active {
    opacity: 1;
  }
}
</style>
