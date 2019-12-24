<template>
  <div class="body">
    <ul class="list">
      <li
        v-for="(month, index) in months"
        :key="`${month}-month`"
        :class="{ selected: (index === selectedMoth)}"
        class="list-item"
        @click="handleClick(index)"
      >
        {{ month }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
	name: 'Month',
  props: {
	  name: {
	    type: Object,
      required: true
    },
    selectedMoth: {
	    type: Number,
      required: true
    }
  },
  methods: {
    handleClick(month) {
      this.$emit('month', month);
    }
  },
  computed: {
	  months() {
	    return Object.values(this.name).map(i => i.substring(0, 3));
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/var";

.body {
  height: 242px;
  overflow: auto;
  padding: 0 12px;
}

.list {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  list-style: none;
}

.list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 36px;
  padding: 0 16px;
  border-radius: 4px;
  font-family: Roboto, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: $c-black;
  background-color: $c-white;
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
</style>
