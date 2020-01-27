<template>
	<main>
    <h1>DEMO PAGE</h1>
    <section>
      <h3>Use <b>DateTimePicker</b> in date only mode</h3>
      <div>
        <VueMaterialDateTimePicker  v-model="dateOnly" :disabled-dates="disabledDates" :is-date-only="true" />
      </div>
      <code>
        &lt;VueMaterialDateTimePicker v-model="dateOnly" :is-date-only="true" /&gt;
      </code>
    </section>
    <section>
      <h3>Use <b>DateTimePicker</b> in time only mode</h3>
      <div>
        <VueMaterialDateTimePicker v-model="timeOnly" :is-time-only="true" />
      </div>
      <code>
        &lt;VueMaterialDateTimePicker v-model="dateOnly" :is-time-only="true" /&gt;
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
    <section>
      <h3><b>DateTimePicker disabled date and time</b></h3>
      <div>
        <VueMaterialDateTimePicker :disabled-dates="disabledDatesAndTime" v-model="dateAndTime"  />
      </div>
    </section>
    <section>
      <h3><b>DateTimePicker</b> disabled dates</h3>
      <div>
        <VueMaterialDateTimePicker v-model="dateOnly" :disabled-dates="disabledDates" :is-date-only="true" />
      </div>
      <code>
        &lt;VueMaterialDateTimePicker v-model="dateOnly" :disabled-dates="disabledDates" :is-date-only="true"&gt;
      </code>
      <code>
        disabledDates: [
        {
        from: new Date(),
        to: new Date(2020, 0, 25)
        },
        {
        from: new Date(2020, 0, 28),
        to: new Date(2020, 0, 30)
        }
        ]
      </code>
    </section>
    <section>
      <h3><b>DateTimePicker minute step</b></h3>
      <div>
        <VueMaterialDateTimePicker :minute-step="minuteStep" v-model="dateAndTime"  />
      </div>
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
    timeOnly: null,
    dateAndTime: null,
    disabledDatesAndTime: {
      to: new Date()
    },
    disabledDates: [
      {
        from: '2020-01-22T19:56:54.766Z',
        to: '2020-01-23T14:56:54.766Z'
      },
      {
        from: new Date(2020, 0, 28),
        to: new Date(2020, 0, 30)
      }
    ],
    minuteStep: 15
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
