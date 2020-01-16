import {mount} from '@vue/test-utils'
import Time from '../../../src/components/Time'

describe('Time', () => {
  let component

  beforeEach(() => {
    component = mount(Time, {
      propsData: {
        isPm: true,
        mode: 2
      }
    })
  })

  test('Should be an Vue instance', () => {
    expect(component.isVueInstance()).toBeTruthy()
  })

  test('Should have props', () => {
    expect(component.vm.$props).toEqual({
      isPm: true,
      mode: 2
    })
  })
})
