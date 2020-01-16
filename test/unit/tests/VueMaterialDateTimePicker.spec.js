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
    expect(VueMaterialDateTimePicker.methods.handleClick).toBeTruthy()
  })

  test('Should have method handleClose', () => {
    expect(VueMaterialDateTimePicker.methods.handleClose).toBeTruthy()
  })

  test('Should have method handleSet', () => {
    expect(VueMaterialDateTimePicker.methods.handleSet).toBeTruthy()
  })
})
