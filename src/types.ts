import type {
  FieldPluginActions,
  FieldPluginData,
} from '@storyblok/field-plugin'

export interface PluginContent {
  count: number
  foo: string
}

export interface PluginData extends FieldPluginData {
  content: PluginContent
}

export interface PluginActions extends Omit<FieldPluginActions, 'setContent'> {
  setContent: (newContent: Partial<PluginContent>) => void
  // custom actions:
  setCount: (newCount: number) => void
}

export type PluginResponse =
  | {
      type: 'loading'
      error?: never
      data?: never
      actions?: never
    }
  | {
      type: 'error'
      error: Error
      data?: never
      actions?: never
    }
  | {
      type: 'loaded'
      error?: never
      data: PluginData
      actions: PluginActions
    }
