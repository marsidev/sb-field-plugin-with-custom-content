<script setup lang="ts">
import { useFieldPlugin } from '../useFieldPlugin';

const plugin = useFieldPlugin();

function handleChange(event: Event) {
	event.preventDefault();
	const value = (event.target as HTMLInputElement).value;
	plugin.actions.setContent({ foo: value });
}
</script>

<template>
	<div>
		<h2>Field content.foo</h2>

		<input :value="plugin.data.content.foo" @input="handleChange" />
	</div>
</template>
