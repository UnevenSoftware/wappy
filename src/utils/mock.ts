import { Stats } from '~/composable/stats'
import mock from '../../exports/mock.json'

export const mockStats = (enabled = false): Stats | undefined => {
  if (enabled) return mock as unknown as Stats
  return undefined
}