import { axe } from 'jest-axe'
import { renderRoute } from '../test-utils'

describe('accessibility', () => {
  it.each(['/', '/producao', '/projetos', '/contato', '/privacidade'])('has no axe violations on %s', async (path) => {
    const { container } = renderRoute(path)
    expect(await axe(container)).toHaveNoViolations()
  })
})
