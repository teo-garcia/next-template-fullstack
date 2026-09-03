export type HealthStatus = 'ok' | 'degraded' | 'down'

export interface HealthResponse {
  checks?: Record<string, string>
  status: HealthStatus
  timestamp: string
  version: string
}

const HEALTH_STATUSES = new Set<HealthStatus>(['ok', 'degraded', 'down'])
const HEALTH_VERSION = '0.0.0'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

export const createHealthyHealthResponse = (): HealthResponse => ({
  status: 'ok',
  timestamp: new Date().toISOString(),
  version: HEALTH_VERSION,
})

export const parseHealthResponse = (value: unknown): HealthResponse => {
  if (!isRecord(value)) {
    throw new TypeError('Health response must be an object')
  }

  if (
    typeof value['status'] !== 'string' ||
    !HEALTH_STATUSES.has(value['status'] as HealthStatus)
  ) {
    throw new TypeError('Health response status is invalid')
  }

  const status = value['status'] as HealthStatus
  if (typeof value['timestamp'] !== 'string') {
    throw new TypeError('Health response timestamp is invalid')
  }

  if (typeof value['version'] !== 'string') {
    throw new TypeError('Health response version is invalid')
  }

  const timestamp = value['timestamp']
  const version = value['version']
  const checksValue = value['checks']

  if (checksValue != undefined && !isRecord(checksValue)) {
    throw new TypeError('Health response checks must be an object')
  }

  const checks =
    checksValue == undefined
      ? undefined
      : Object.fromEntries(
          Object.entries(checksValue).map(([key, item]) => {
            if (typeof item === 'string') {
              return [key, item]
            }

            throw new TypeError(
              `Health response check "${key}" must be a string`
            )
          })
        )

  const response: HealthResponse = { status, timestamp, version }

  if (checks !== undefined) {
    response.checks = checks
  }

  return response
}
