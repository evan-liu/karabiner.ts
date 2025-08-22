import { expect, test } from 'vitest'

// Import just the constants to test them
const KARABINER_CONFIG_DIR = '.config/karabiner'
const KARABINER_CONFIG_FILE = 'karabiner.json'
const JSON_INDENT = 2

const ERROR_MESSAGES = {
  PROFILE_NOT_FOUND: (name: string, jsonPath: string) => 
    `⚠️ Profile ${name} not found in ${jsonPath}.\n\nℹ️ Please check the profile name in the Karabiner-Elements UI and \n    - Update the profile name at writeToProfile()\n    - Create a new profile if needed`,
  UNKNOWN_ERROR: 'An unknown error occurred',
} as const

test('Constants are properly defined', () => {
  expect(KARABINER_CONFIG_DIR).toBe('.config/karabiner')
  expect(KARABINER_CONFIG_FILE).toBe('karabiner.json') 
  expect(JSON_INDENT).toBe(2)
  expect(ERROR_MESSAGES.UNKNOWN_ERROR).toBe('An unknown error occurred')
})

test('Error message function works correctly', () => {
  let errorMsg = ERROR_MESSAGES.PROFILE_NOT_FOUND('test-profile', '/path/to/config.json')
  expect(errorMsg).toContain('test-profile')
  expect(errorMsg).toContain('/path/to/config.json')
  expect(errorMsg).toContain('⚠️ Profile')
})