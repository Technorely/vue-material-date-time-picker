import {mount} from '@vue/test-utils'
import Year from '../../../src/components/Year'

describe('Year', () => {
  let component

  beforeEach(() => {
    component = mount(Year, {
      propsData: {
        selectedYear: 2019
      }
    })
  })

  test('Should be an Vue instance', () => {
    expect(component.isVueInstance()).toBeTruthy()
  })

  test('Should have props', () => {
    expect(component.vm.$props).toEqual({
      yearRange: (() => {
        const currentYear = new Date().getFullYear()
        const range = 100
        const minYear = currentYear - range
        const yearsRange = []
        for (let i = minYear; i <= minYear + range * 2; i++) {
          yearsRange.push(i)
        }
        return yearsRange
      })(),
      selectedYear: 2019
    })
  })
})
