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

  test('Should emit back', () => {
    component.vm.goBack()
    component.vm.$nextTick().then(() => {
      expect(component.emitted().back).toBeTruthy()
    })
  })

  test('Should emit forward', () => {
    component.vm.goForward()
    component.vm.$nextTick().then(() => {
      expect(component.emitted().forward).toBeTruthy()
    })
  })

  test('Should emit toggle', () => {
    component.vm.toggleMode()
    component.vm.$nextTick().then(() => {
      expect(component.emitted().toggleMode).toBeTruthy()
    })
  })

  test('Should emit toggle', () => {
    component.vm.toggleMode()
    component.vm.$nextTick().then(() => {
      expect(component.emitted().toggleMode).toBeTruthy()
    })
  })
})
