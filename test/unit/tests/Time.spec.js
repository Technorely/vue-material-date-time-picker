import {mount} from '@vue/test-utils'
import Time from '../../../src/components/Time'

describe('Time', () => {
  let component

  beforeEach(() => {
    component = mount(Time, {
      propsData: {
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
      isPm: true,
      mode: 3
    })
  })

  test('Should handle mouse down', () => {
    component.vm.handleMouseDown({
      XC: 10,
      YC: 20
    })
    setTimeout(() => {
      expect(component.vm.XC).toEqual(10)
    })
  })

  test('Should handle mouse up', () => {
    component.vm.handleMouseUp()
    component.vm.$nextTick().then(() => {
      expect(component.emitted().mode).toBeTruthy()
    })
  })

  test('Should handle mouse move', () => {
    component.vm.handleMouseDown({
      XC: 10,
      YC: 20
    })
    component.vm.handleMouseMove({
      XC: 10,
      YC: 20
    })
    setTimeout(() => {
      expect(component.vm.XC).toEqual(10)
    })
  })

  test('Should handle pm change', () => {
    component.vm.handlePmChange(3)
    component.vm.$nextTick().then(() => {
      expect(component.emitted().pm && component.emitted().hour).toBeTruthy()
    })
  })
})
