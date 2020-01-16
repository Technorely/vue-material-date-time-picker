import {mount} from '@vue/test-utils'
import Day from '../../../src/components/Day'

describe('Day', () => {
  let component

  beforeEach(() => {
    component = mount(Day, {
      propsData: {
        name: ['Friday'],
        number: 15,
        position: 2,
        selectedDay: 5
      }
    })
  })

  test('Should be an Vue instance', () => {
    expect(component.isVueInstance()).toBeTruthy()
  })

  test('Should have props', () => {
    expect(component.vm.$props).toEqual({
      name: ['Friday'],
      number: 15,
      position: 2,
      selectedDay: 5
    })
  })
})
