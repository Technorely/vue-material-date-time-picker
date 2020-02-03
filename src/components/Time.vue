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
          v-for="time in templateTimePoints"
          :key="`${time.point}-clockItem`"
          class="vmdtp_item minute-step_default"
          :class="{ disabled: time.disabled }"
        >
          {{ time.point }}
        </li>
      </ul>
      <div class="vmdtp_center-point"></div>
      <div
        class="vmdtp_arrow"
        :class="{ pressed: isPressed }"
        :style="{ transform: `rotate(${degree}deg)` }"
      ></div>
      <button
        :disabled="!isEnabledAM"
        class="vmdtp_button vmdtp_button--left"
        :class="{ active: !isPm }"
        @click.prevent="handlePmChange(false)"
      >
        AM
      </button>
      <button
        class="vmdtp_button vmdtp_button--right"
        :class="{ active: isPm }"
        @click.prevent="handlePmChange(true)"
      >
        PM
      </button>
    </div>
  </div>
</template>

<script>
import { MODE } from '../constants'
import helpers from '../helpers/'

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
      default: 1
    },
    hourStep: {
      type: Number,
      default: 1
    },
    disabledDatesAndTimes: {
      type: Array | Object,
      required: false
    },
    selectedDay: {
      type: Number,
      required: true
    },
    selectedYear: {
      type: Number,
      required: true
    },
    selectedMoth: {
      type: Number,
      required: true
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
    isHourMode: {
      immediate: true,
      handler (v) {
        if (v) this.hours ? this.$emit('hour', this.hours) : this.findInitialPoint()
      }
    },
    degree: {
      immediate: true,
      handler (v) {
        if (this.isHourMode) {
          const hours = Math.round(v / 30)
          if (this.isPm) {
            if (hours === 0) {
              this.hours = helpers.isHourDisabled(12, this.allHours) ? this.moveArrowToClosestPoint() : 12
            } else {
              this.hours = helpers.isHourDisabled(hours, this.allHours) ? this.moveArrowToClosestPoint() : hours
            }
          } else {
            this.hours = hours === 12 ? 0 : hours
          }
          this.$emit('hour', this.hours)
        } else {
          const rounded = Math.round(v / 6)
          const minutes = rounded !== 60 ? rounded : 0
          if (!minutes) {
            this.minutes = helpers.isMinuteDisabled(minutes, this.allMinutes) ? this.moveArrowToClosestPoint() : minutes
          } else {
            this.minutes = minutes
          }
          this.$emit('minute', this.minutes)
        }
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
        const areMinutesSet = !!this.minutes
        return areHoursSet && areMinutesSet ? this.$emit('update-can-finish', true) : this.$emit('update-can-finish', false)
      }
    },
    minutes: {
      immediate: true,
      handler (v) {
        const areHoursSet = this.hours !== null
        const areMinutesSet = v !== null
        return areHoursSet && areMinutesSet
          ? this.$emit('update-can-finish', false)
          : this.$emit('update-can-finish', true)
      }
    },
    isPressed: {
      handler (v) {
        return this.$emit('update-can-finish', !v)
      }
    },
    isPm: {
      handler (v) {
        this.hours = v
          ? this.hours === 0
            ? 12
            : this.hours
          : this.hours === 12
          ? 0
          : this.hours
        this.$emit('hour', this.hours)
      }
    }
  },
  mounted () {
    this.$emit('minute', 0)
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
          if (this.disabledDatesAndTimes) {
            this.moveArrowToClosestPoint()
            setTimeout(() => this.$emit('mode', this.MODE.MINUTE), 750)
          } else {
            this.$emit('mode', this.MODE.MINUTE)
          }

          // this.$emit('hour', this.hours)
        }
      } else {
        // move clock arrow to closest value
        if (this.minuteStep === 1) {
          if (this.minutes === 0) {
            this.$emit('minute', this.minutes)
          } else {
            this.moveArrowToClosestPoint()
            this.$emit('minute', this.minutes)
          }
        } else {
          this.moveArrowToClosestPoint()
        }
      }
    },
    findInitialPoint () {
      const time = this.allHours[this.allHours.length - 1]
      const { disabled } = time
      this.disabledDatesAndTimes ? (disabled ? this.moveArrowToClosestPoint() : this.hours = time.point) : this.hours = time.point
    },
    moveArrowToClosestPoint () {
      const clockItemsAsNumbers = [...this.enabledPoints].map(p => p.point)
      if (this.isHourMode) {
        const hours = this.findClosest(clockItemsAsNumbers, this.hours)
        this.hours = this.isPm
          ? hours === 0
            ? 12
            : hours
          : hours === 12
          ? 0
          : hours
        this.degree = this.calcDegByHours(this.hours)
      } else {
        clockItemsAsNumbers.push(60)
        this.minutes = this.findClosest(clockItemsAsNumbers, this.minutes)
        this.minutes = this.minutes === 60 ? 0 : this.minutes

        const minutesForDegreeCalculation =
          this.minutes === 0 ? 60 : this.minutes
        this.degree = this.calcDegByMinutes(minutesForDegreeCalculation)
      }
    },
    findClosest (arr, target) {
      return arr.reduce((prev, curr) =>
        Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev
      )
    },
    handleMouseMove (event) {
      if (event.offsetX > 250 || event.offsetY > 250) {
        this.isPressed = false
        return
      }
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
      return (minutes / 60) * 360
    },
    calcDegByHours (hours) {
      return (hours / 12) * 360
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
      const fractionUpperPart =
        vectorAB[0] * vectorAC[0] + vectorAB[1] * vectorAC[1]
      const fractionLowerPart0 =
        Math.pow(vectorAB[0], 2) + Math.pow(vectorAB[1], 2)
      const fractionLowerPart1 =
        Math.pow(vectorAC[0], 2) + Math.pow(vectorAC[1], 2)
      const fractionLowerPart =
        Math.sqrt(fractionLowerPart0) * Math.sqrt(fractionLowerPart1)
      const arcCosARadians = Math.acos(fractionUpperPart / fractionLowerPart)
      const xRight = XC >= 0 && XC < 125
      const xLeft = XC >= 125 && XC <= 250
      const yTop = YC >= 0 && YC < 125
      const yBottom = YC >= 125 && YC <= 250
      if (xLeft && (yTop || yBottom)) {
        this.degree = Math.floor((180 / Math.PI) * arcCosARadians)
      }
      if (xRight && (yTop || yBottom)) {
        this.degree = 360 - Math.floor((180 / Math.PI) * arcCosARadians)
      }
    }
  },
  computed: {
    isHourMode () {
      return this.mode === this.MODE.HOUR
    },
    realMinutes () {
      const minutes = helpers.createReal60MinutesArray()
      const params = {
        forHours: false,
        isPm: this.isPm,
        year: this.selectedYear,
        month: this.selectedMoth,
        day: this.selectedDay,
        hours: this.hours,
        disabledDatesAndTimes: this.disabledDatesAndTimes,
        timePoints: minutes
      }

      if (this.minuteStep >= 5) {
        const disabled = this.disabledDatesAndTimes.length > 0 ? helpers.createDisabledTimesArray(params) : []
        const stepsParams = {
          minutes: minutes,
          step: this.minuteStep,
          disabledMinutes: disabled
        }
        return helpers.filterMinutesWithSteps(stepsParams)
      } else {
        return minutes
      }
    },
    realHours () {
      if (this.isPm) {
        const arr = Array.from({ length: 12 }, (v, k) => k + 1)
        return arr.map(item => ({ disabled: false, point: item }))
      } else {
        const arr = Array.from({ length: 12 }, (v, k) => k)
        arr.push(arr.shift())
        return arr.map(item => ({ disabled: false, point: item }))
      }
    },
    disabledHours () {
      if (!this.disabledDatesAndTimes) return []
      const params = {
        forHours: true,
        isPm: this.isPm,
        year: this.selectedYear,
        month: this.selectedMoth,
        day: this.selectedDay,
        hours: null,
        disabledDatesAndTimes: this.disabledDatesAndTimes,
        timePoints: this.realHours
      }
      return helpers.createDisabledTimesArray(params)
    },
    disabledMinutes () {
      if (!this.disabledDatesAndTimes) return []
      const params = {
        forHours: false,
        isPm: this.isPm,
        year: this.selectedYear,
        month: this.selectedMoth,
        day: this.selectedDay,
        hours: this.hours,
        disabledDatesAndTimes: this.disabledDatesAndTimes,
        timePoints: this.realMinutes
      }
      return helpers.createDisabledTimesArray(params)
    },
    allHours () {
      const hours = this.realHours.map(h =>
        this.disabledHours.find(k => k && k.point === h.point)
          ? this.disabledHours.find(k => k.point === h.point)
          : h
      )
      return hours
    },
    allMinutes () {
      const minutes = this.realMinutes.map(h =>
        this.disabledMinutes.find(k => k && k.point === h.point)
          ? this.disabledMinutes.find(k => k.point === h.point)
          : h
      )
      return minutes
    },
    enabledHours () {
      return this.disabledHours.length > 0
        ? this.allHours.filter(h => !h.disabled)
        : this.allHours
    },
    enabledMinutes () {
      return this.disabledMinutes.length > 0
        ? this.allMinutes.filter(h => !h.disabled)
        : this.allMinutes.filter(h => !h.disabled)
    },
    templateTimePoints () {
      if (this.isHourMode) {
        return this.allHours
      } else {
        return this.allMinutes.filter(m => m.point % 5 === 0)
      }
    },
    enabledPoints () {
      return this.isHourMode ? this.enabledHours : this.enabledMinutes
    },
    isEnabledAMFormatForHours () {
      if (!this.disabledDatesAndTimes) return true
      const params = {
        forHours: true,
        isPm: false,
        year: this.selectedYear,
        month: this.selectedMoth,
        day: this.selectedDay,
        hours: null,
        disabledDatesAndTimes: this.disabledDatesAndTimes,
        timePoints: this.realHours
      }
      const hours = helpers.createDisabledTimesArray(params)
      return hours.length < 12
    },
    isEnabledAMFormatForMinutes () {
      if (!this.disabledDatesAndTimes) return true
      const params = {
        forHours: false,
        isPm: false,
        year: this.selectedYear,
        month: this.selectedMoth,
        day: this.selectedDay,
        hours: this.hours,
        disabledDatesAndTimes: this.disabledDatesAndTimes,
        timePoints: this.realMinutes
      }
      const minutes = helpers.createDisabledTimesArray(params)
      return minutes.length < 60
    },
    isEnabledAM () {
      return this.isHourMode
        ? this.isEnabledAMFormatForHours
        : this.isEnabledAMFormatForMinutes
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
    z-index: 100;
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
    width: 3px;
    bottom: 50%;
    left: calc(50% - 2px);
    transform-origin: center bottom;
    position: absolute;
    z-index: 100;
    background-color: rgba($c-blue, 0.75);
    transition: all 0.75s cubic-bezier(0.19, 1, 0.22, 1);
    &.pressed {
      transition: none;
    }
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: -15px;
      top: -32px;
      z-index: 100;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: rgba($c-blue, 0.3);
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
    background-color: $c-white;
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
    font-size: 17px;
    font-weight: 500;
    transform: translate(-50%, -50%);
    color: $c-black;
    background-color: rgba($c-blue, 0.6);
    border-radius: 50%;
    &.disabled {
      color: $c-gray-darken;
      opacity: 0.8;
    }
    &.minute-step_default {
      &:nth-child(1) {
        transform: translate(135%, -345%);
      }
      &:nth-child(2) {
        transform: translate(255%, -220%);
      }
      &:nth-child(3) {
        transform: translate(300%, -50%);
      }
      &:nth-child(4) {
        transform: translate(255%, 135%);
      }
      &:nth-child(5) {
        transform: translate(130%, 255%);
      }
      &:nth-child(6) {
        transform: translate(-50%, 300%);
      }
      &:nth-child(7) {
        transform: translate(-235%, 250%);
      }
      &:nth-child(8) {
        transform: translate(-350%, 130%);
      }
      &:nth-child(9) {
        transform: translate(-400%, -50%);
      }
      &:nth-child(10) {
        transform: translate(-345%, -230%);
      }
      &:nth-child(11) {
        transform: translate(-220%, -350%);
      }
      &:nth-child(12) {
        transform: translate(-50%, -400%);
      }
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
    background-color: $c-blue-darken;
    color: $c-white;
  }
}
</style>
