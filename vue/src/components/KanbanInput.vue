<template>
    <div class="flex flex-col gap-2 m-2 p-2 rounded bg-gray-100 border border-neutral-300">
        <Input v-model="title" type="text" placeholder="Task Title" />
        <Textarea v-model="description" placeholder="Task Description" />
        <Button @click="handleAddTask" variant="primary">Add Task</Button>
    </div>
</template>

<script setup lang="ts">
import Button from './common/Button.vue'
import Input from './common/Input.vue'
import Textarea from './common/Textarea.vue'
import { ref } from 'vue'

const title = ref('')
const description = ref('')

const emit = defineEmits<{
    (e: 'add', task: { title: string; description: string }): void;
}>();

const handleAddTask = () => {
    if (title.value) {
        emit('add', { title: title.value, description: description.value });
        title.value = '';
        description.value = '';
    }
};
</script>