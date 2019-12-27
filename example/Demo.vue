<template>
	<main>
    <h1>DEMO PAGE</h1>
    <section>
      <h3>Use <b>DateTimePicker</b> in date only mode</h3>
      <div>
        <VueMaterialDateTimePicker v-model="dateOnly" :is-date-only="true" />
      </div>
      <code>
        &lt;VueMaterialDateTimePicker v-model="dateOnly" :is-date-only="true" /&gt;
      </code>
    </section>
    <section>
      <h3>Use <b>DateTimePicker</b> in date & time mode</h3>
      <div>
        <VueMaterialDateTimePicker v-model="dateAndTime" :is-date-only="false" />
      </div>
      <code>
        &lt;VueMaterialDateTimePicker v-model="dateOnly" :is-date-only="false" /&gt;
      </code>
    </section>
  </main>
</template>

<script>
import VueMaterialDateTimePicker from '../src/components/VueMaterialDateTimePicker.vue'

export default {
  name: 'Demo',
  components: {
    VueMaterialDateTimePicker
  },
  data: () => ({
    dateOnly: null,
    dateAndTime: null
  })
}
</script>

<style lang="css" scoped>
main {
  width: 525px;
  margin: 0 auto;
}
section {
  margin-bottom: 16px;
}
h1 {
  font-weight: 600;
  text-align: center;
}
h3 {
  font-weight: 500;
}
code {
  display: inline-block;
  margin: 16px 0;
  padding: 6px;
  background-color: darkgray;
  border-radius: 4px;
}
</style>
