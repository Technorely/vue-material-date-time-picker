<template>
  <div class="vmdtp_body">
    <div class="vmdtp_clock">
      <ul
        class="vmdtp_items"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
      >
        <li
          v-for="clockItem in clockItemsDefault"
          :key="`${clockItem}-clockItem`"
          class="vmdtp_item minute-step_default"
          :class="{disabled: isPointDisabled(clockItem)}"
        >
          {{ clockItem }}
        </li>
      </ul>
      <div class="vmdtp_center-point"></div>
      <div
        class="vmdtp_arrow"
        :class="{pressed: isPressed}"
        :style="{transform: `rotate(${degree}deg)`}"
      ></div>
      <button
        class="vmdtp_button vmdtp_button--left"
        :class="{active: !isPm}"
        @click.prevent="handlePmChange(false)"
      >AM</button>
      <button
        class="vmdtp_button vmdtp_button--right"
        :class="{active: isPm}"
        @click.prevent="handlePmChange(true)"
      >PM</button>
    </div>
  </div>
</template>

<script>
import { MODE } from '../constants'

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
    },
    minuteStep: {
      type: Number,
      required: false,
      default: 1,
      validator: v => [1, 5, 15, 30, 60].includes(v)
    }
  },
  data: () => ({
    MODE,
    isPressed: false,
    XC: null,
    YC: null,
    degree: 0,
    hours: null,
    minutes: null
  }),
  watch: {
    degree (v) {
      if (this.isHourMode) {
        this.hours = Math.floor(v / 30)
        this.$emit('hour', this.hours)
      }
      if (!this.isHourMode) {
        const rounded = Math.round(v / 6)
        this.minutes = rounded !== 60 ? rounded : 0
        this.$emit('minute', this.minutes)
      }
    },
    mode (v) {
      if (v === 3) this.degree = this.hours * 30
      if (v === 4) this.degree = this.minutes * 6
    },
    hours: {
      immediate: true,
      handler (v) {
        const areHoursSet = v !== null
        const areMinutesSet = this.minutes !== null
        return (areHoursSet && areMinutesSet)
          ? this.$emit('update-can-finish', true)
          : this.$emit('update-can-finish', false)
      }
    },
    minutes: {
      immediate: true,
      handler (v) {
        const areHoursSet = this.hours !== null
        const areMinutesSet = v !== null
        return (areHoursSet && areMinutesSet)
          ? this.$emit('update-can-finish', true)
          : this.$emit('update-can-finish', false)
      }
    }
  },
  methods: {
    handleMouseDown (event) {
      this.isPressed = true
      this.XC = event.offsetX
      this.YC = event.offsetY
      this.calculateDeg()
    },
    handleMouseUp () {
      this.isPressed = false
      if (this.isHourMode) {
        if (this.minuteStep === 60) {
          this.minutes = 0
          this.$emit('minute', this.minutes)
        } else {
          this.$emit('mode', this.MODE.MINUTE)
        }
      } else {
        // move clock arrow to closest value
        if (this.minuteStep === 1) {
          this.$emit('minute', this.minutes)
        } else {
          this.moveArrowToClosestMinute()
        }
      }
    },
    moveArrowToClosestMinute () {
      const clockItems = [...this.clockItems]
      clockItems[clockItems.length - 1] = 60
      this.minutes = this.findClosest(clockItems, this.minutes)
      this.minutes = this.minutes === 60 ? 0 : this.minutes

      const minutesForDegreeCalculation = this.minutes === 0 ? 60 : this.minutes
      this.degree = this.calcDegByMinutes(minutesForDegreeCalculation)
    },
    isPointDisabled (item) {
      return !this.isHourMode && !this.clockItems.includes(item)
    },
    findClosest (arr, target) {
      return arr.reduce((prev, curr) => Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev)
    },
    handleMouseMove (event) {
      if (this.isPressed) {
        this.XC = event.offsetX
        this.YC = event.offsetY
        this.calculateDeg()
      }
    },
    handlePmChange (mode) {
      this.$emit('pm', mode)
      this.$emit('hour', this.hours)
    },
    calcDegByMinutes (minutes) {
      return ((minutes / 60) * 360)
    },
    calculateDeg () {
      const XA = 125
      const YA = 125
      const XB = 125
      const YB = 0
      const XC = this.XC
      const YC = this.YC
      const vectorAB = [XB - XA, YB - YA]
      const vectorAC = [XC - XA, YC - YA]
      const fractionUpperPart = (vectorAB[0] * vectorAC[0]) + (vectorAB[1] * vectorAC[1])
      const fractionLowerPart0 = Math.pow(vectorAB[0], 2) + Math.pow(vectorAB[1], 2)
      const fractionLowerPart1 = Math.pow(vectorAC[0], 2) + Math.pow(vectorAC[1], 2)
      const fractionLowerPart = Math.sqrt(fractionLowerPart0) * Math.sqrt(fractionLowerPart1)
      const arcCosARadians = Math.acos(fractionUpperPart / fractionLowerPart)
      const xRight = XC >= 0 && XC < 125
      const xLeft = XC >= 125 && XC <= 250
      const yTop = YC >= 0 && YC < 125
      const yBottom = YC >= 125 && YC <= 250
      if (xLeft && (yTop || yBottom)) this.degree = Math.floor((180 / Math.PI) * arcCosARadians)
      if (xRight && (yTop || yBottom)) this.degree = 360 - Math.floor((180 / Math.PI) * arcCosARadians)
    }
  },
  computed: {
    isHourMode () {
      return this.mode === this.MODE.HOUR
    },
    clockItemsDefault () {
      if (this.isHourMode) {
        return Array.from({length: 12}, (v, k) => k + 1)
      } else {
        const arr = Array.from({ length: 12 }, (v, k) => k * 5)
        arr.push(arr.shift())
        return arr
      }
    },
    clockItems () {
      if (this.isHourMode) {
        return Array.from({length: 12}, (v, k) => k + 1)
      } else {
        const arr = this.minuteStep !== 1 ? Array.from({length: 60 / this.minuteStep}, (v, k) => k * this.minuteStep) : Array.from({ length: 12 }, (v, k) => k * 5)
        arr.push(arr.shift())
        return arr
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/var";

.vmdtp_body {
  height: 290px;
  overflow: auto;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vmdtp_clock {
  position: relative;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background-color: $c-gray;
  .vmdtp_center-point {
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
  .vmdtp_arrow {
    pointer-events: none;
    height: calc(50% - 36px);
    width: 4px;
    bottom: 50%;
    left: calc(50% - 2px);
    transform-origin: center bottom;
    position: absolute;
    z-index: 10;
    background-color: rgba($c-blue, 0.75);
    transition: all 0.75s ease-in-out;
    &.pressed {
      transition: none;
    }
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
  .vmdtp_items {
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
  .vmdtp_item {
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
    font-family: sans-serif;
    font-size: 24px;
    font-weight: 500;
    transform: translate(-50%, -50%);
    color: $c-black;
    border-radius: 50%;
    &.disabled {
      color: $c-gray-darken;
      opacity: 0.8;
    }
    &.minute-step_default {
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
}

.vmdtp_button {
  position: absolute;
  z-index: 1;
  bottom: 0;
  border: none;
  border-radius: 50%;
  margin: 0;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-family: sans-serif;
  font-size: 12px;
  line-height: 12px;
  font-weight: 600;
  color: $c-black;
  background-color: rgba($c-gray, 0.75);

  outline: none;
  &--left {
    left: 0;
  }
  &--right {
    right: 0;
  }
  &.active {
    background-color: $c-blue;
    color: $c-white;
  }
}
</style>
