<template>
  <div class="vmdtp_body">
    <ul class="vmdtp_list">
      <li
        v-for="year in yearRange"
        :key="`${year}-year`"
        :ref="`${year}-year`"
        :class="{ selected: (parseInt(year) === parseInt(selectedYear))}"
        class="vmdtp_list-item"
        @click.prevent="handleClick(year)"
      >
        {{ year }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Year',
  props: {
    yearRange: {
      required: false,
      default: () => {
        const currentYear = new Date().getFullYear()
        const range = 100
        const minYear = currentYear - range
        const yearsRange = []
        for (let i = minYear; i <= minYear + range * 2; i++) {
          yearsRange.push(i)
        }
        return yearsRange
      }
    },
    selectedYear: {
      type: Number,
      required: true
    }
  },
  methods: {
    handleClick (year) {
      this.$emit('year', year)
      this.scroll()
    },
    scroll () {
      const pointYear = this.selectedYear - 3
      const selectedYearElement = this.$refs[`${pointYear}-year`][0]
      if (selectedYearElement && 'scrollIntoView' in selectedYearElement) selectedYearElement.scrollIntoView({ behavior: 'auto' })
    }
  },
  mounted () {
    this.scroll()
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/var";

.vmdtp_body {
  height: 290px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba($c-black, 0.25);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: $c-blue;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: darken($c-blue, 20%);
  }
}

.vmdtp_list {
  list-style: none;
  padding: 0;
}

.vmdtp_list-item {
  padding: 8px 0;
  text-align: center;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.1px;
  line-height: 22px;
  &:hover {
    cursor: pointer;
    background-color: rgba($c-black, 0.1);
  }
  &.selected {
    font-size: 26px;
    font-weight: 500;
    color: $c-blue;
    padding: 10px 0;
  }
}
</style>
