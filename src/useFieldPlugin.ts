import { inject } from 'vue'
import type { PluginResponse } from './types'

export function useFieldPlugin() {
  const plugin = inject<PluginResponse>(
    'field-plugin',
    () => {
      throw new Error(
        'You need to wrap your app with `<FieldPluginProvider>` component.',
      )
    },
    true,
  )

  if (plugin.type !== 'loaded') {
    throw new Error(
      'The plugin is not loaded, yet `useFieldPlugin()` was invoked. Ensure that the component that invoked `useFieldPlugin()` is wrapped within `<FieldPluginProvider>`, and that it is placed within the default slot.',
    )
  }

  return plugin as Extract<PluginResponse, { type: 'loaded' }>
}
