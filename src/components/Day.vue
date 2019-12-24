<template>
  <div class="body">
    <ul class="head">
      <li
        v-for="(date, index) in name"
        :key="`${date}-${index}`"
        class="head__item"
      >
        {{ date }}
      </li>
    </ul>
    <ul class="main">
      <li
        v-for="(date, index) in dates"
        :key="`${date}-${index}`"
        class="main__item"
        @click="handleClick(date)"
      >
        <span :class="{ selected: (date === selectedDate)}">
          {{ date }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
	name: 'PickerBodyDate',
  props: {
	  name: {
	    type: Array,
      required: false,
      default: () => (['S', 'M', 'T', 'W', 'T', 'F', 'S'])
    },
    number: {
	    type: Number,
      required: false,
      default: 31
    },
    position: {
	    type: Number,
      required: false,
      default: 0
    },
    selectedDate: {
	    type: Number,
      required: false,
      default: 15
    }
  },
  methods: {
    handleClick(date) {
      this.$emit('date', date);
    }
  },
  computed: {
	  dates() {
	    const prevMonthDates = new Array(this.position).fill(null);
	    const monthDates = Array.from({length: this.number}, (v, k) => k+1);
      return [...prevMonthDates, ...monthDates];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/var";

.body {
  height: calc(290px - 16px);
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
