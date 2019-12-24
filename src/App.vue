<template>
  <div id="app">
    <Picker />
  </div>
</template>

<script>
import Picker from "./components/Picker";

export default {
  name: "app",
  components: {
    Picker
  }
};
</script>

<style>
#app {
  margin-top: 100px;
  display: flex;
  justify-content: center;
}
</style>
