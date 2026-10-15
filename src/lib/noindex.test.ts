import { SITE_NOINDEX } from './seo'

describe('SITE_NOINDEX', () => {
  it('is off by default so production pages stay indexable', () => {
    expect(SITE_NOINDEX).toBe(false)
  })
})
