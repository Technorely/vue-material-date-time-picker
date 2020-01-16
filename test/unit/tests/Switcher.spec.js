import {mount} from '@vue/test-utils'
import Switcher from '../../../src/components/Switcher'

describe('Switcher', () => {
  let component

  beforeEach(() => {
    component = mount(Switcher, {
      propsData: {
        mode: 'month',
        year: 2020,
        month: 'January'
      }
    })
  })

  test('Should be an Vue instance', () => {
    expect(component.isVueInstance()).toBeTruthy()
  })

  test('Should have props', () => {
    expect(component.vm.$props).toEqual({
      mode: 'month',
      year: 2020,
      month: 'January'
    })
  })
})
