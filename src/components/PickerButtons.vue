<template>
	<div class="buttons">
    <img
      v-if="mode === 3 || mode === 4"
      src="../assets/img/calendar.png"
      alt="calendar"
      class="img"
      @click="$emit('calendar')"
    >
    <div style="flex-grow: 1"></div>
    <button class="button" @click="$emit('cancel')">Cancel</button>
    <button class="button" :class="{disabled: isDisabled}" @click="$emit('ok')">OK</button>
  </div>
</template>

<script>
export default {
	name: 'PickerButtons',
  props: {
	  mode: {
	    type: Number,
      required: true
    },
    canFinish: {
	    type: Boolean,
      required: true
    }
  },
  computed: {
	  isDisabled() {
	    return (this.mode === 4 || this.mode === 3) && !this.canFinish;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/var.scss";

.img {
  width: 16px;
  cursor: pointer;
}

.buttons {
  margin: 8px 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.button {
  padding: 0;
  margin: 0 0 0 24px;
  border: none;
  background-color: transparent;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  line-height: 22px;
  font-weight: 600;
  text-transform: uppercase;
  color: $c-blue;
  cursor: pointer;
  &.disabled {
    opacity: 0.25;
    cursor: not-allowed;
  }
}
</style>
