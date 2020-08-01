<template>
  <label class="vmdtp_label">
    <slot :attrs="{...$attrs, value: displayedValue, disabled: isPickerShown}" :on="listeners">
      <input
        v-bind="$attrs"
        :value="displayedValue"
        v-on="listeners"
        :disabled="isPickerShown"
        ref="input"
        class="vmdtp_input"
      >
    </slot>
    <transition>
      <Picker
        v-if="isPickerShown"
        :defined-date="value"
        :minute-step="minuteStep"
        :is-date-only="isDateOnly"
        :is-time-only="isTimeOnly"
        :disabled-dates="parsedDisabledDates"
        :disabled-dates-and-times="parsedDisabledDatesAndTimes"
        @close="handleClose"
        @set="handleSet"
      />
    </transition>
  </label>
</template>

<script>
import Picker from './Picker.vue'
import helpers from '../helpers/'
console.log(helpers)

export default {
  name: 'VueMaterialDateTimePicker',
  components: {
    Picker
  },
  props: {
    value: {
      type: String | Number | Date | Object,
      required: false,
      default: ''
    },
    valueFormatted: {
      type: String | Number | Date | Object,
      required: false,
      default: ''
    },
    isDateOnly: {
      type: Boolean,
      required: false,
      default: false
    },
    isTimeOnly: {
      type: Boolean,
      required: false,
      default: false
    },
    disabledDates: {
      type: Array | Object,
      required: false,
      validator: v => {
        const isArray = Array.isArray(v)
        const isObject = typeof v === 'object'
        if (isArray) {
          return v.every(value => (value.hasOwnProperty('to') ||
            value.hasOwnProperty('from')) &&
            (value.to && Date.parse(value.to)) ||
            (value.from && Date.parse(value.from)))
        } else if (isObject) {
          return (v.hasOwnProperty('to') || v.hasOwnProperty('from')) && (v.to && Date.parse(v.to)) ||
            (v.from && Date.parse(v.to))
        }
        return false
      }
    },
    disabledDatesAndTimes: {
      type: Array | Object,
      required: false,
      validator: v => {
        const isArray = Array.isArray(v)
        const isObject = typeof v === 'object'
        if (isArray) {
          return v.every(value => (value.hasOwnProperty('to') ||
            value.hasOwnProperty('from')) &&
            (value.to && Date.parse(value.to)) ||
            (value.from && Date.parse(value.from)))
        } else if (isObject) {
          return (v.hasOwnProperty('to') || v.hasOwnProperty('from')) && (v.to && Date.parse(v.to)) ||
            (v.from && Date.parse(v.to))
        }
        return false
      }
    },
    minuteStep: {
      type: Number,
      required: false,
      default: 1,
      validator: v => [1, 5, 15, 30, 45, 60].includes(v)
    },
    hourStep: {
      type: Number,
      required: false,
      default: 1
    }
  },
  data: () => ({
    isPickerShown: false
  }),
  computed: {
    parsedDisabledDates () {
      if (!this.disabledDates) return []
      const dates = Array.isArray(this.disabledDates) ? this.disabledDates : [this.disabledDates]
      return dates.map(d => {
        Object.keys(d).forEach(k => {
          let date = new Date(d[k])
          d[k] = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        })
        return d
      })
    },
    parsedDisabledDatesAndTimes () {
      if (!this.disabledDatesAndTimes) return []
      const dates = Array.isArray(this.disabledDatesAndTimes) ? this.disabledDatesAndTimes : [this.disabledDatesAndTimes]
      return dates.map(d => {
        Object.keys(d).forEach(k => {
          let date = new Date(d[k])
          d[k] = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
        })
        return d
      })
    },
    listeners () {
      return {
        ...this.$listeners,
        input: event => this.$emit('input', event),
        click: event => {
          event.preventDefault();
          this.handleClick();
        },
        keypress: event => {
          if (event.key === 'Enter') {
            this.isPickerShown = true;
          }
        }
      }
    },
    displayedValue () {
      const isValueFormattedPassed = this.$options.propsData.hasOwnProperty('valueFormatted')
      return isValueFormattedPassed ? this.valueFormatted : this.value
    }
  },
  methods: {
    handleClick () {
      this.isPickerShown = true
    },
    handleClose () {
      this.isPickerShown = false
    },
    handleSet (date) {
      this.isPickerShown = false
      this.$emit('input', date)
    }
  }
}
</script>

<style lang="scss" scoped>
.vmdtp_input {
  box-sizing: border-box;
  width: 100%;
  padding: 8px 12px;
  font-size: 1rem;
  line-height: 1.25;
  border: 1px solid black;
  border-radius: 4px;
  overflow: hidden;
  &[disabled="disabled"] {
    background-color: transparent;
  }
}
</style>
