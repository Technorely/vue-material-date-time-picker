import {mount} from '@vue/test-utils'
import Buttons from '../../../src/components/Buttons'

describe('Buttons', () => {
  let component

  beforeEach(() => {
    component = mount(Buttons, {
      propsData: {
        mode: 2,
        canFinish: true
      }
    })
  })

  test('Should be an Vue instance', () => {
    expect(component.isVueInstance()).toBeTruthy()
  })

  test('Should have props', () => {
    expect(component.vm.$props).toEqual({
      mode: 2,
      canFinish: true,
      isTimeOnly: false
    })
  })
})
