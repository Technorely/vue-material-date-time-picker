import {mount} from '@vue/test-utils'
import VueMaterialDateTimePicker from '../../../src/components/VueMaterialDateTimePicker'

describe('VueMaterialDateTimePicker', () => {
  let component
  let date

  beforeEach(() => {
    date = new Date()
    component = mount(VueMaterialDateTimePicker, {
      propsData: {
        value: date,
        valueFormatted: '',
        isDateOnly: false,
        isTimeOnly: false
      }
    })
  })


  test('Should be an Vue instance', () => {
    expect(component.isVueInstance()).toBeTruthy()
  })

  test('Should have props', () => {
    expect(component.vm.$props).toEqual({
      value: date,
      valueFormatted: '',
      isDateOnly: false,
      isTimeOnly: false
    })
  })

  test('Should have method handleClick', () => {
    component.vm.handleClick()
    expect(component.vm.isPickerShown).toBeTruthy()
  })

  test('Should have method handleClose', () => {
    component.vm.handleClose()
    expect(component.vm.isPickerShown).toBeFalsy()
  })

  test('Should have method handleSet', () => {
    component.vm.handleSet()
    component.vm.$nextTick().then(() => {
      expect(!component.vm.isPickerShown && component.emitted().input).toBeTruthy()
    })
  })
})
