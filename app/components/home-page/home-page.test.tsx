import axe from 'axe-core'

import { render } from '@/lib/test/render'

import { HomePage } from './home-page'

test('HomePage renders the hero', () => {
  const { container } = render(<HomePage />)

  expect(container.querySelector('section')).not.toBeNull()
  expect(container.querySelector('svg')).not.toBeNull()
})

test('HomePage has no accessibility violations', async () => {
  const { container } = render(<HomePage />)

  const results = await axe.run(container)

  expect(results.violations).toEqual([])
})
