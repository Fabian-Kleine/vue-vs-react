<template>
    <input
        class="rounded-md border border-slate-300 bg-transparent transition-shadow px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 disabled:cursor-not-allowed disabled:opacity-50"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>

<script setup lang="ts">
const props = defineProps<{
    modelValue: string;
}>();
</script>
