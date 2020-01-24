<template>
  <div class="vmdtp_body">
    <ul class="vmdtp_head">
      <li
        v-for="(day, index) in name"
        :key="`${day}-${index}`"
        class="vmdtp_head__item"
      >
        {{ day }}
      </li>
    </ul>
    <ul class="vmdtp_main">
      <li
        v-for="(obj, index) in days"
        :key="`${obj.day}-${index}`"
        :class="{disabled: obj.disabled}"
        class="vmdtp_main__item"
        @click.prevent="handleClick(obj.day)"
      >
        <span :class="{ selected: (obj.day === selectedDay)}">
          {{ obj.day }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Day',
  props: {
    name: {
      type: Array,
      required: true
    },
    number: {
      type: Number,
      required: true
    },
    position: {
      type: Number,
      required: true
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
    },
    disabledDates: {
      type: Array | Object,
      required: false
    }
  },
  methods: {
    handleClick (day) {
      this.$emit('day', day)
    }
  },
  computed: {
    days () {
      const prevMonthDays = new Array(this.position).fill(null)
      const monthDays = Array.from({length: this.number}, (v, k) => k + 1)

      const isArray = Array.isArray(this.disabledDates)
      let filteredDates
      const dates = [...prevMonthDays, ...monthDays]

      if (isArray) {
        filteredDates = dates.map(v => {
          let obj = { day: v }
          const dayDate = new Date(this.selectedYear, this.selectedMoth, v)
          this.disabledDates.forEach(o => {
            const toJSDate = o.to && new Date(o.to)
            const fromJSDate = o.from && new Date(o.from)
            if (o.to && !o.from && !obj.disabled) {
              obj.disabled = !(toJSDate.getTime() <= dayDate.getTime())
            } else if (!o.to && o.from && !obj.disabled) {
              obj.disabled = !(dayDate.getTime() <= fromJSDate.getTime())
            } else if (o.to && o.from && !obj.disabled) {
              obj.disabled = (fromJSDate.getTime() <= dayDate.getTime() && dayDate.getTime() <= toJSDate.getTime())
            } else if (!obj.disabled) {
              obj.disabled = false
            }
          })
          return obj
        })
      } else {
        const { from = null, to = null } = this.disabledDates || {}

        const toJSDate = to && new Date(to)
        const fromJSDate = from && new Date(from)

        filteredDates = dates.map(v => {
          let obj = { day: v, disabled: false }
          const dayDate = new Date(this.selectedYear, this.selectedMoth, v)
          if (to && !from) {
            obj.disabled = !(toJSDate.getTime() <= dayDate.getTime())
          } else if (!to && from) {
            obj.disabled = !(dayDate.getTime() <= fromJSDate.getTime())
          } else if (to && from) {
            obj.disabled = (fromJSDate.getTime() <= dayDate.getTime() && dayDate.getTime() <= toJSDate.getTime())
          } else {
            obj.disabled = false
          }
          return obj
        })
      }

      return filteredDates
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
}

.vmdtp_head {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  &__item {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
    font-size: 12px;
    font-weight: 600;
    line-height: 22px;
    color: rgba($c-black, 0.5);
  }
}

.vmdtp_main {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
  list-style: none;
  &__item {
    margin: 8px 0;
    display: flex;
    justify-content: center;
    flex-basis: calc(100% / 7);
    &.disabled {
      pointer-events: none;
      span {
        color: $c-gray;
      }
    }
    span {
      padding: 0;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      font-family: sans-serif;
      font-size: 12px;
      font-weight: 600;
      line-height: 22px;
      color: $c-black;
      transition: all 0.25s ease-in-out;
      &:hover {
        cursor: pointer;
        background-color: rgba($c-black, 0.1);
      }
      &.selected {
        background-color: $c-blue;
        color: $c-white;
      }
    }
  }
}
</style>
