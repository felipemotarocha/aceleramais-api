import { Router } from 'express'

const championshipRoutes = (router: Router): void => {
  router.post('/championship', (_req, res) => {
    res.json({ ok: 'ok' })
  })
}

export default championshipRoutes
