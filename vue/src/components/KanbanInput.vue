<template>
    <div class="flex flex-col gap-2 my-2 p-2 rounded bg-gray-100 border border-neutral-300">
        <Input class="font-bold" v-model="title" type="text" placeholder="Task Title" />
        <Textarea v-model="description" placeholder="Task Description" />
        <div class="flex justify-center gap-2">
            <Button class="flex-1" @click="handleCancel" variant="secondary">Cancel</Button>
            <Button class="flex-1" @click="handleAddTask" variant="primary">Save</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from './common/Button.vue'
import Input from './common/Input.vue'
import Textarea from './common/Textarea.vue'
import { ref } from 'vue'

const props = defineProps<{
    defaultValues?: { title: string; description: string };
}>();

const title = ref(props.defaultValues?.title || '');
const description = ref(props.defaultValues?.description || '');

const emit = defineEmits<{
    (e: 'add', task: { title: string; description: string }): void;
    (e: 'cancel'): void;
}>();

const handleAddTask = () => {
    if (title.value) {
        emit('add', { title: title.value, description: description.value });
        title.value = '';
        description.value = '';
    }
};

const handleCancel = () => {
    emit('cancel');
};
</script>