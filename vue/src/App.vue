<template>
  <main class="flex flex-col items-center min-h-screen bg-gray-100 p-4 w-fit min-w-screen">
    <h1 class="text-4xl text-center font-bold">Kanban Board (Vue)</h1>
    <div class="flex gap-4 mt-4 flex-1 w-full px-2">
      <!-- Iterate over columns -->
      <KanbanCol v-for="column in columns" :key="column.status" :title="column.title" @drop="drop($event, column.status)">
        <!-- Pass filtered tasks to KanbanItem loop -->
        <KanbanItem v-for="task in getTasksByStatus(column.status)" :key="task.id" :task="task"
          @delete="handleDeleteTask" @update="handleUpdateTask" @dragstart="drag($event, task)" @reorder="handleReorderTask" />
        <!-- Dynamically set status for adding tasks -->
        <Button class="w-full mt-2" variant="primary" @click="handleAddTask(column.status)">
          <Plus class="mx-auto" />
          <span class="sr-only">Add Task</span>
        </Button>
      </KanbanCol>
    </div>
  </main>
</template>

<script setup lang="ts">
import KanbanCol from './components/KanbanCol.vue'
import KanbanItem from './components/KanbanItem.vue'
import Button from './components/common/Button.vue'
import { ref } from 'vue'
import type { Task } from './types'
import { Plus } from 'lucide-vue-next'

const tasks = ref<Task[]>([]);

// Define columns configuration
const columns: { title: string; status: Task['status'] }[] = [
  { title: 'Backlog', status: 'backlog' },
  { title: 'To Do', status: 'todo' },
  { title: 'In Progress', status: 'in-progress' },
  { title: 'Review', status: 'review' },
  { title: 'Done', status: 'done' },
];

// Function to filter tasks by status
const getTasksByStatus = (status: Task['status']) => {
  return tasks.value.filter(task => task.status === status);
};

const handleAddTask = (status: Task["status"]) => {
  const newTask: Task = {
    id: crypto.randomUUID(),
    title: '',
    description: '',
    status
  };
  tasks.value.push(newTask);
};

const handleDeleteTask = (id: string) => {
  tasks.value = tasks.value.filter(task => task.id !== id);
};

const handleUpdateTask = (updatedTask: Task) => {
  const index = tasks.value.findIndex(task => task.id === updatedTask.id);
  if (index !== -1) {
    tasks.value.splice(index, 1, updatedTask);
  }
};

const handleReorderTask = ({ draggedId, targetId }: { draggedId: string, targetId: string }) => {
  const originalDraggedIndex = tasks.value.findIndex(task => task.id === draggedId);
  const originalTargetIndex = tasks.value.findIndex(task => task.id === targetId);

  if (originalDraggedIndex === -1 || originalTargetIndex === -1) {
    console.error("Dragged or target task not found");
    return;
  }

  const draggedTask = tasks.value[originalDraggedIndex];
  const targetTask = tasks.value[originalTargetIndex];

  if (draggedTask.status !== targetTask.status) {
    console.warn("Cannot reorder tasks between different columns via item drop.");
    return;
  }

  tasks.value.splice(originalDraggedIndex, 1);

  const newTargetIndex = tasks.value.findIndex(task => task.id === targetId);

  let insertIndex;
  if (originalDraggedIndex < originalTargetIndex) {
    insertIndex = newTargetIndex + 1;
  } else {
    insertIndex = newTargetIndex;
  }

  tasks.value.splice(insertIndex, 0, draggedTask);
};

const drag = (event: DragEvent, task: Task) => {
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', task.id);
  }
};

const drop = (event: DragEvent, status: Task['status']) => {
  if (event.dataTransfer) {
    const taskId = event.dataTransfer.getData('text/plain');
    const task = tasks.value.find(task => task.id === taskId);

    if (task && task.status !== status) { // Only update if status changes
      task.status = status;
      // Find the original index and remove the task
      const originalIndex = tasks.value.findIndex(t => t.id === taskId);
      if (originalIndex !== -1) {
        tasks.value.splice(originalIndex, 1);
      }
      // Add the task to the end of the new column (or handle specific positioning if needed)
      tasks.value.push(task);
    }
  }
};
</script>
