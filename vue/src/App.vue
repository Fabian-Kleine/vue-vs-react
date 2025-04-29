<script setup lang="ts">
import KanbanCol from './components/KanbanCol.vue'
import KanbanItem from './components/KanbanItem.vue'
import Button from './components/common/Button.vue'
import { ref, computed } from 'vue'
import type { Task } from './types'

const tasks = ref<Task[]>([]);

const backlogTasks = computed(() => tasks.value.filter(task => task.status === 'backlog'));
const todoTasks = computed(() => tasks.value.filter(task => task.status === 'todo'));
const inProgressTasks = computed(() => tasks.value.filter(task => task.status === 'in-progress'));
const reviewTasks = computed(() => tasks.value.filter(task => task.status === 'review'));
const doneTasks = computed(() => tasks.value.filter(task => task.status === 'done'));

const handleAddTask = (status: Task["status"]) => {
  const newTask = {
    id: (tasks.value.length + 1).toString(),
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
  <main className="flex flex-col items-center min-h-screen bg-gray-100 p-4 overflow-hidden">
    <h1 className="text-4xl text-center font-bold">Kanban Board (Vue)</h1>
    <div className="flex gap-4 mt-4 flex-1 overflow-x-auto w-full max-w-full px-2">
      <KanbanCol title="Backlog">
        <KanbanItem v-for="task in backlogTasks" :key="task.id" :task="task" @delete="handleDeleteTask" @update="handleUpdateTask" />
        <Button class="w-full mt-2" variant="primary" @click="handleAddTask('backlog')">
          Add Task
        </Button>
      </KanbanCol>
      <KanbanCol title="To Do">
        <KanbanItem v-for="task in todoTasks" :key="task.id" :task="task" @delete="handleDeleteTask" @update="handleUpdateTask" />
        <Button class="w-full mt-2" variant="primary" @click="handleAddTask('todo')">
          Add Task
        </Button>
      </KanbanCol>
      <KanbanCol title="In Progress">
        <KanbanItem v-for="task in inProgressTasks" :key="task.id" :task="task" @delete="handleDeleteTask" @update="handleUpdateTask" />
        <Button class="w-full mt-2" variant="primary" @click="handleAddTask('in-progress')">
          Add Task
        </Button>
      </KanbanCol>
      <KanbanCol title="Review">
        <KanbanItem v-for="task in reviewTasks" :key="task.id" :task="task" @delete="handleDeleteTask" @update="handleUpdateTask" />
        <Button class="w-full mt-2" variant="primary" @click="handleAddTask('review')">
          Add Task
        </Button>
      </KanbanCol>
      <KanbanCol title="Done">
        <KanbanItem v-for="task in doneTasks" :key="task.id" :task="task" @delete="handleDeleteTask" @update="handleUpdateTask" />
        <Button class="w-full mt-2" variant="primary" @click="handleAddTask('done')">
          Add Task
        </Button>
      </KanbanCol>
    </div>
  </main>
</template>
