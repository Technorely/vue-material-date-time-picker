import {mount} from '@vue/test-utils'
import Picker from '../../../src/components/Picker'

describe('Picker', () => {
  let component;
  beforeEach(() => {
    component = mount(Picker)
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

  test('Should set day', () => {
    component.vm.setDay(15)
    expect(component.vm.date).toEqual(15)
  })

  test('Should set month', () => {
    component.vm.setMonth(1)
    expect(component.vm.month).toEqual(1)
  })

  test('Should set year', () => {
    component.vm.setYear(2020)
    expect(component.vm.year).toEqual(2020)
  })

  test('Should set hour', () => {
    component.vm.setHour(11)
    expect(component.vm.hour).toEqual(11)
  })

  test('Should set minute', () => {
    component.vm.setMinute(11)
    expect(component.vm.minute).toEqual(11)
  })

  test('Should set pm state', () => {
    component.vm.setPmState(false)
    expect(component.vm.pm).toEqual(false)
  })

  test('Should set mode', () => {
    component.vm.setMode(3)
    expect(component.vm.mode).toEqual(3)
  })

  test('Should emit date', () => {
    component.vm.setMonth(1)
    component.vm.setDay(15)
    component.vm.setHour(11)
    component.vm.setMinute(11)
    component.vm.setPmState(false)
    component.vm.handleOkClick()
    component.vm.$nextTick().then(() => {
      expect(component.emitted().set).toBeTruthy()
    })
  })

  test('Should emit date in isDateOnly mode', () => {
    component.vm.handleOkClick() // run if (!this.isDateOnly && this.mode === 2) statement
    component = mount(Picker, {
      propsData: {
        isDateOnly: true,
        isTimeOnly: false,
        definedDate: null
      }
    })
    component.vm.setYear(2020)
    component.vm.setMinute(11)
    component.vm.setPmState(false)
    component.vm.handleOkClick()
    component.vm.$nextTick().then(() => {
      expect(component.emitted().set).toBeTruthy()
    })
  })

  test('Should emit close', () => {
    component.vm.handleCancelClick()
    component.vm.$nextTick().then(() => {
      expect(component.emitted().close).toBeTruthy()
    })
  })

  test('Should set mode 2', () => {
    component.vm.handleCalendarClick()
    expect(component.vm.mode).toEqual(2)
  })

  test('Should handle toggle', () => {
    component.vm.handleToggleMode()
    expect(component.vm.mode).toEqual(1)
  })

  test('Should be mode 0', () => {
    component.vm.handleToggleMode()
    component.vm.handleToggleMode()
    expect(component.vm.mode).toEqual(0)
  })

  test('Should be mode 2', () => {
    component.vm.handleToggleMode()
    component.vm.handleToggleMode()
    component.vm.handleToggleMode()
    expect(component.vm.mode).toEqual(2)
  })

  test('Should handle switch back', () => {
    component.vm.handleSwitchBack()
    expect(component.vm.year).toEqual(2019)
  })

  test('Should handle switch year to 2019', () => {
    component.vm.setMode(1)
    component.vm.handleSwitchBack()
    expect(component.vm.year).toEqual(2019)
  })

  test('Should handle switch month to 1', () => {
    component.vm.setMode(1)
    component.vm.setMonth(2)
    component.vm.handleSwitchBack()
    expect(component.vm.month).toEqual(1)
  })

  test('Should handle switch forward', () => {
    component.vm.setMode(1)
    component.vm.setMonth(11)
    component.vm.handleSwitchForward()
    expect(component.vm.month).toEqual(0)
  })

  test('Should handle switch month to 5', () => {
    component.vm.setMode(1)
    component.vm.setMonth(4)
    component.vm.handleSwitchForward()
    expect(component.vm.month).toEqual(5)
  })

  test('Should handle switch year to 2021', () => {
    component.vm.setMode(1)
    component.vm.handleSwitchForward()
    expect(component.vm.year).toEqual(2021)
  })

  test('Should update mode', () => {
    component.vm.handleModeUpdateFromTimeHeader(2)
    expect(component.vm.mode).toEqual(2)
  })
})
