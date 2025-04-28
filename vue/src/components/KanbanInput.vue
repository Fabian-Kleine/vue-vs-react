<template>
    <div className="flex flex-col gap-2 m-2 p-2 rounded bg-gray-100 border border-neutral-300">
        <Input type="text" placeholder="Task Title" />
        <Textarea placeholder="Task Description" />
        <Button variant="primary">Add Task</Button>
    </div>
</template>

<script setup lang="ts">
import Button from './common/Button.vue'
import Input from './common/Input.vue'
import Textarea from './common/Textarea.vue'
</script>