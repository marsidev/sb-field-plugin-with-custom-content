<script setup lang="ts">
import { computed } from 'vue';
import { useFieldPlugin } from '../useFieldPlugin';

const plugin = useFieldPlugin();

function handleIncrement() {
	const value = plugin.data.content.count;
	plugin.actions.setContent({
		count: (typeof value === 'number' ? value : 0) + 1,
	});

	// same as:
	// plugin.actions.setCount((typeof value === 'number' ? value : 0) + 1);
}

const label = computed(() => {
	const value = plugin.data.content.count;
	return typeof value !== 'number' ? 0 : value;
});
</script>

<template>
	<div>
		<h2>Field content.count</h2>

		<div class="counter-value">
			{{ label }}
		</div>

		<button class="btn w-full" @click="handleIncrement">
			Increment
		</button>
	</div>
</template>
