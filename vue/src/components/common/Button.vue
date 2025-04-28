<template>
    <button
        :class="cn('transition-all text-white px-4 py-2 rounded focus:ring-4 cursor-pointer', variantClass)"
    >
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import { cn } from '../../lib/utils'

const props = defineProps<{
    variant: 'primary' | 'secondary' | 'destructive'
}>();

const { variant } = props;

const variantClass = variant === 'primary'
    ? 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-400'
    : variant === 'secondary'
    ? 'bg-gray-500 hover:bg-gray-600 focus:ring-gray-400'
    : 'bg-red-500 hover:bg-red-600 focus:ring-red-400';
</script>