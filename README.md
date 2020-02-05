# vue-material-date-time-picker

A date and time picker Vue component. Compatible with Vue 2.x. Performed in material design.

- [Demo](#demo)
- [Install](#install)
- [Usage](#usage)
- [Props](#available-props)

NB. Vue 1.x is not supported.

## Demo

To view a demo online: https://codesandbox.io/s/vue-materialdatetimepicker-demo-gs52h

To view demo examples locally clone the repo and run `npm install && npm run serve` or `yarn && yarn serve`

## Install

``` bash
npm install vue-material-date-time-picker --save
```
or
```
yarn add vue-material-date-time-picker --save
```

To use component in your project import it as it is shown bellow

``` javascript
<script>
import VueMaterialDateTimePicker from 'vue-material-date-time-picker'

export default {
  // ...
  components: {
    VueMaterialDateTimePicker
  },
  // ...
}
</script>
```

## Usage

``` html
<VueMaterialDateTimePicker v-model="date" :is-date-only="true" />
```

*value* prop that is handled by `v-model` will be `new Date()` type string

## Available props

| Prop                          | Type            | Default     | Description                                   |
|-------------------------------|-----------------|-------------|-----------------------------------------------|
| value                         | String          |             | Date value of the date time picker            |
| valueFormatted                | String          |             | Formatted value that will be displayed, if    |
|                               |                 |             | not passed value (JS Date()) will be used     |
| is-date-only                  | Boolean         |             | Define if picker takes only date or time too  |                      |
