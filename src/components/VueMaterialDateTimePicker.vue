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
        :is-date-only="isDateOnly"
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
      type: String | Number,
      required: false,
      default: ''
    },
    valueFormatted: {
      type: String | Number | Date,
      required: false,
      default: ''
    },
    isDateOnly: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: () => ({
    isPickerShown: false
  }),
  computed: {
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
