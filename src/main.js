import Vue from 'vue';
import VueMaterialDateTimePicker from './components/VueMaterialDateTimePicker.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(VueMaterialDateTimePicker)
}).$mount('#app');
