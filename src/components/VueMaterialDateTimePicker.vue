<template>
  <label class="vmdtp_label">
    <input
      v-bind="$attrs"
      :value="displayedValue"
      v-on="listeners"
      :disabled="isPickerShown"
      ref="input"
      class="vmdtp_input"
      @click.prevent="handleClick"
      @keypress.enter="isPickerShown = true"
    >
    <transition>
      <Picker
        v-if="isPickerShown"
        :defined-date="value"
        :minute-step="minuteStep"
        :is-date-only="isDateOnly"
        :is-time-only="isTimeOnly"
        :disabled-dates="parsedDisabledDates"
        @close="handleClose"
        @set="handleSet"
      />
    </transition>
  </label>
</template>

<script>
import Picker from './Picker.vue'
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
      if (this.disabledDates && Array.isArray(this.disabledDates)) {
        const dates = [ ...this.disabledDates ]
        return dates.map(d => {
          Object.keys(d).forEach(k => {
            let date = new Date(d[k])
            d[k] = new Date(date.getFullYear(), date.getMonth(), date.getDate())
          })
          return d
        })
      } else if (this.disabledDates) {
        const dates = { ...this.disabledDates }
        Object.keys(dates).forEach(k => {
          let date = new Date(dates[k])
          dates[k] = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        })
        return dates
      }
    },
    listeners () {
      return {
        ...this.$listeners,
        input: event => this.$emit('input', event)
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
