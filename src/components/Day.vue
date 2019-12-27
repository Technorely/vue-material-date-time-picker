<template>
  <div class="body">
    <ul class="head">
      <li
        v-for="(day, index) in name"
        :key="`${day}-${index}`"
        class="head__item"
      >
        {{ day }}
      </li>
    </ul>
    <ul class="main">
      <li
        v-for="(day, index) in days"
        :key="`${day}-${index}`"
        class="main__item"
        @click="handleClick(day)"
      >
        <span :class="{ selected: (day === selectedDay)}">
          {{ day }}
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
      return [...prevMonthDays, ...monthDays]
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
}

.head {
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
    font-family: Roboto, sans-serif;
    font-size: 12px;
    font-weight: 600;
    line-height: 22px;
    color: rgba($c-black, 0.5);
  }
}

.main {
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
    span {
      padding: 0;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      font-family: Roboto, sans-serif;
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
