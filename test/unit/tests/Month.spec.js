import {mount} from '@vue/test-utils'
import Month from '../../../src/components/Month'

describe('Month', () => {
  const name = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
  }
  let component

  beforeEach(() => {
    component = mount(Month, {
      propsData: {
        name,
        selectedMoth: 0
      }
    })
  })

  test('Should be an Vue instance', () => {
    expect(component.isVueInstance()).toBeTruthy()
  })

  test('Should have props', () => {
    expect(component.vm.$props).toEqual({
      name,
      selectedMoth: 0
    })
  })

  test('Should have method handleClick', () => {
    expect(Month.methods.handleClick).toBeTruthy()
  })

  test('Should have list of months', () => {
    expect(component.find('.vmdtp_list-item')).toBeTruthy()
  })
})
