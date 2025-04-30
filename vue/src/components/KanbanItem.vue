<template>
    <template v-if="!isEditing">
        <div
            class="relative flex flex-col gap-2 my-2 p-2 rounded bg-gray-100 border border-neutral-300 cursor-grab"
            draggable="true"
            :data-id="task.id.toString()"
            @dragover.prevent
            @dragenter.prevent
            @drop="handleDropOnItem"
        >
            <div class="absolute top-2 right-2 flex gap-1">
                <button @click="handleEdit"
                    class="cursor-pointer p-1 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    title="Delete Task" aria-label="Delete task">
                    <Pencil class="w-4 h-4 text-gray-600" />
                </button>
                <button @click="handleDelete"
                    class="cursor-pointer p-1 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    title="Delete Task" aria-label="Delete task">
                    <Trash2 class="w-4 h-4 text-gray-600" />
                </button>
            </div>
            <h3 class="text-lg font-semibold break-words max-w-[80%]">{{ task.title }}</h3>
            <p class="text-gray-600 break-words max-w-[80%]">{{ task.description }}</p>
        </div>
    </template>
    <template v-else>
        <KanbanInput :default-values="{ title: task.title, description: task.description }" @add="handleUpdateTask" @cancel="handleCancel" />
    </template>
</template>

<script setup lang="ts">
import KanbanInput from './KanbanInput.vue';
import { Pencil, Trash2 } from 'lucide-vue-next'
import type { Task } from '../types'
import { ref, watchEffect } from 'vue';

const props = defineProps<{ task: Task }>();

const emit = defineEmits<{
    (e: 'delete', id: string): void;
    (e: 'update', task: Task): void;
    (e: 'reorder', { draggedId, targetId }: { draggedId: string, targetId: string }): void;
    (e: 'changeStatusAndReorder', { draggedId, targetId, newStatus }: { draggedId: string, targetId: string, newStatus: Task['status'] }): void;
}>();

const handleDelete = () => {
    emit('delete', props.task.id.toString());
};

const handleEdit = () => {
    isEditing.value = true;
};

const handleCancel = () => {
    if (props.task.title == '') {
        emit('delete', props.task.id.toString());
        return;
    }
    isEditing.value = false;
};

const handleUpdateTask = ({ title, description }: { title: string, description: string }) => {
    const task = { ...props.task, title, description };
    emit('update', task);
    isEditing.value = false;
};

const handleDropOnItem = (event: DragEvent) => {
    event.stopPropagation(); // Always stop propagation now
    if (event.dataTransfer) {
        const data = JSON.parse(event.dataTransfer.getData('text/plain'));
        const draggedId = data.id;
        const draggedStatus = data.status;
        const targetId = props.task.id;
        const targetStatus = props.task.status;

        if (draggedId && targetId && draggedId !== targetId) {
            if (draggedStatus === targetStatus) {
                // Same column: Emit reorder
                emit('reorder', { draggedId, targetId });
            } else {
                // Different column: Emit status change and reorder relative to target
                emit('changeStatusAndReorder', { draggedId, targetId, newStatus: targetStatus });
            }
        }
    }
};

const isEditing = ref(false);

watchEffect(() => {
    if (props.task.title == '') {
        isEditing.value = true;
    }
});

</script>