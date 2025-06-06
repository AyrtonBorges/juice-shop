export type { ChallengeKey } from '../models/challenge'
import type { ChallengeKey } from '../models/challenge'

const overrides: Record<ChallengeKey, boolean | undefined> = {} as any

export function setOverride (key: ChallengeKey, enabled: boolean) {
  overrides[key] = enabled
}

export function clearOverride (key: ChallengeKey) {
  delete overrides[key]
}

export function getOverride (key: ChallengeKey): boolean | undefined {
  return overrides[key]
}

export function listOverrides (): Record<ChallengeKey, boolean> {
  const result: Record<ChallengeKey, boolean> = {} as any
  for (const k of Object.keys(overrides)) {
    const val = overrides[k as ChallengeKey]
    if (typeof val === 'boolean') {
      result[k as ChallengeKey] = val
    }
  }
  return result
}
