import express, { type Request, type Response } from 'express'
import { challenges } from '../data/datacache'
import * as utils from '../lib/utils'
import { setOverride, clearOverride, type ChallengeKey } from '../lib/challengeOverride'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  const list = Object.values(challenges).map(ch => ({
    key: ch.key,
    name: ch.name,
    enabled: utils.isChallengeEnabled(ch)
  }))
  res.json({ status: 'success', data: list })
})

router.put('/:key', (req: Request, res: Response) => {
  const key = req.params.key as ChallengeKey
  const challenge = challenges[key]
  if (!challenge) {
    res.status(404).json({ error: 'Challenge not found' })
    return
  }
  if (typeof req.body.enabled !== 'boolean') {
    res.status(400).json({ error: 'enabled flag missing' })
    return
  }
  setOverride(key, req.body.enabled)
  res.json({ key, enabled: req.body.enabled })
})

router.delete('/:key', (req: Request, res: Response) => {
  const key = req.params.key as ChallengeKey
  const challenge = challenges[key]
  if (!challenge) {
    res.status(404).json({ error: 'Challenge not found' })
    return
  }
  clearOverride(key)
  res.json({ key, enabled: utils.isChallengeEnabled(challenge) })
})

export default router
