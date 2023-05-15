<script setup lang="ts">
import { provide, reactive } from 'vue';
import { createFieldPlugin } from '@storyblok/field-plugin';
import { convertToRaw } from '../utils';
import type { PluginContent, PluginData, PluginResponse } from '../types';

const plugin = reactive<PluginResponse>({
	type: 'loading',
});

const initialContent: PluginContent = {
	count: 0,
	foo: '',
};

createFieldPlugin((newState) => {
	plugin.type = newState.type;
	plugin.error = newState.error;
	plugin.data = {
		...plugin.data,
		content: initialContent,
	} as PluginData;

	// Instead of replacing `plugin.data` which loses the reactive reference,
	// we're assigning each property into `plugin.data`.
	if (newState.type === 'loaded') {
		if (plugin.data) {
			const keys = Object.keys(newState.data) as Array<keyof PluginData>;
			keys.forEach((key) => {
				if (typeof plugin.data[key] === 'object') {
					// @ts-expect-error not sure how to solve this
					Object.assign(plugin.data[key], newState.data[key]);
				} else {
					// @ts-expect-error not sure how to solve this
					plugin.data[key] = newState.data[key];
				}
			});
		} else {
			// @ts-expect-error if `plugin.type` just became 'loaded', then `plugin.data` is still undefined.
			// So this is a valid else-branch.
			plugin.data = newState.data;
		}
	}

	if (newState.actions) {
		plugin.actions = {
			...newState.actions,

			// general content setter:
			setContent: (newContent) => {
				newState.actions.setContent(
					convertToRaw({
						...(newState.data.content as PluginContent),
						...newContent,
					})
				);
			},

			// specific content setters:
			setCount: (newCount) => {
				newState.actions.setContent({
					...(plugin.data?.content as PluginContent),
					count: convertToRaw(newCount),
				});
			},
		};
	} else {
		plugin.actions = undefined;
	}
});

provide('field-plugin', plugin);
</script>

<template>
	<slot v-if="plugin.type === 'loading'" name="loading" />

	<slot v-if="plugin.type === 'error'" name="error" />

	<slot v-if="plugin.type === 'loaded'" />
</template>
