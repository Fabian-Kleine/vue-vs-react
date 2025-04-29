<template>
    <div class="relative flex flex-col gap-2 m-2 p-2 rounded bg-gray-100 border border-neutral-300">
        <button @click="handleDelete"
            class="absolute cursor-pointer top-2 right-2 p-1 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            title="Delete Task" aria-label="Delete task">
            <Trash2 class="w-4 h-4 text-gray-600" />
        </button>
        <h3 class="text-lg font-semibold">{{ task.title }}</h3>
        <p class="text-gray-600">{{ task.description }}</p>
    </div>
</template>

<script setup lang="ts">
import { Trash2 } from 'lucide-vue-next'
import type { Task } from '../types'

const props = defineProps<{ task: Task }>();

const emit = defineEmits<{
    (e: 'delete', id: string): void;
}>();

const handleDelete = () => {
    emit('delete', props.task.id.toString());
};
</script>