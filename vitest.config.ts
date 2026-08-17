import sharedConfig from '@teo-garcia/vitest-config-shared/next'
import { defineConfig, mergeConfig } from 'vitest/config'

export default mergeConfig(
  defineConfig(sharedConfig),
  defineConfig({
    optimizeDeps: {
      include: ['@tanstack/react-query', 'better-themes'],
    },
    test: {
      setupFiles: ['./vitest.setup.ts'],
    },
  })
)
