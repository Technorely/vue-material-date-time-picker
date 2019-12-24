<template>
  <div class="switch">
    <span class="arrow arrow--left" @click="goBack">&#10094;</span>
    <div class="content">
      <p class="text" @click="toggleMode">{{ `${this.month} ${this.year}` }}</p>
    </div>
    <span class="arrow arrow--right" @click="goForward">&#10095;</span>
  </div>
</template>

<script>
export default {
  name: 'Switcher',
  props: {
    mode: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    month: {
      type: String,
      required: true
    }
  },
  methods: {
    goBack() {
      this.$emit('back');
    },
    goForward() {
      this.$emit('forward');
    },
    toggleMode() {
      this.$emit('toggleMode');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/var";

.switch {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 16px;
}

.arrow {
  color: $c-black;
  width: 24px;
  height: 24px;
  text-align: center;
  &:hover {
    cursor: pointer;
    border-radius: 50%;
    background-color: rgba($c-black, 0.1);
  }
}

.content {
  flex-grow: 1;
}

.text {
  margin: 0;
  text-align: center;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}
</style>
