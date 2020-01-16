import {mount} from '@vue/test-utils';
import HeadDate from '../../../src/components/HeadDate';

describe('HeadDate', () => {
  let component

  beforeEach(() => {
    component = mount(HeadDate, {
      propsData: {
        year: 2020,
        date: 15,
        month: 'January',
        weekDay: 'Friday'
      }
    })
  })

  test('Should be an Vue instance', () => {
    expect(component.isVueInstance()).toBeTruthy()
  })

  test('Should have props', () => {
    expect(component.vm.$props).toEqual({
      year: 2020,
      date: 15,
      month: 'January',
      weekDay: 'Friday'
    })
  })
})
