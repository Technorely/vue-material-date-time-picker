import {mount} from '@vue/test-utils'
import HeadTime from '../../../src/components/HeadTime'

describe('HeadTime', () => {
  let component

  beforeEach(() => {
    component = mount(HeadTime, {
      propsData: {
        hours: 6,
        minutes: 10,
        isPm: true,
        mode: 3
      }
    })
  })

  test('Should be an Vue instance', () => {
    expect(component.isVueInstance()).toBeTruthy()
  })

  test('Should have props', () => {
    expect(component.vm.$props).toEqual({
      hours: 6,
      minutes: 10,
      isPm: true,
      mode: 3
    })
  })
})
