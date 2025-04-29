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
    tasks.value[index] = updatedTask;
  }
};
</script>

<template>
  <main className="flex flex-col items-center min-h-screen bg-gray-100 p-4 w-fit min-w-screen">
    <h1 className="text-4xl text-center font-bold">Kanban Board (Vue)</h1>
    <div className="flex gap-4 mt-4 flex-1 w-full px-2">
      <!-- Iterate over columns -->
      <KanbanCol v-for="column in columns" :key="column.status" :title="column.title">
        <!-- Pass filtered tasks to KanbanItem loop -->
        <KanbanItem v-for="task in getTasksByStatus(column.status)" :key="task.id" :task="task" @delete="handleDeleteTask" @update="handleUpdateTask" />
        <!-- Dynamically set status for adding tasks -->
        <Button class="w-full mt-2" variant="primary" @click="handleAddTask(column.status)">
          <Plus class="mx-auto" />
          <span class="sr-only">Add Task</span>
        </Button>
      </KanbanCol>
    </div>
  </main>
</template>
