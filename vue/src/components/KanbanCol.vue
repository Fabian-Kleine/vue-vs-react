<template>
    <div
        @dragover.prevent
        @dragenter.prevent
        class="flex flex-col items-center shrink-0 border border-neutral-300 bg-neutral-200 rounded-lg w-[350px] overflow-hidden [&:nth-child(1)>.kanban-col-title]:bg-pink-200 [&:nth-child(3)>.kanban-col-title]:bg-amber-200 [&:nth-child(4)>.kanban-col-title]:bg-lime-300 [&:nth-child(5)>.kanban-col-title]:bg-cyan-200">
        <div class="kanban-col-title w-full py-4 bg-red-300">
            <h2 class="text-2xl font-bold text-center">{{ title }}</h2>
        </div>
        <div class="w-full px-2">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>