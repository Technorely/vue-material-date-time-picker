import {mount} from '@vue/test-utils'
import Picker from '../../../src/components/Picker'

describe('Picker', () => {
  let component;
  beforeEach(() => {
    component = mount(Picker);
  })

  test('Should be an Vue instance', () => {
    expect(component.isVueInstance()).toBeTruthy()
  })

  test('Should have props', () => {
    expect(component.vm.$props).toEqual({
      isDateOnly: false,
      isTimeOnly: false,
      definedDate: null
    })
  })
})
