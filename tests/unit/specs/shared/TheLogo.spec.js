import { mount } from '@vue/test-utils'
import TheLogo from '~/components/shared/TheLogo'

describe('TheLogo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(TheLogo)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
