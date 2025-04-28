<script setup lang="ts">
import KanbanCol from './components/KanbanCol.vue'
import KanbanInput from './components/KanbanInput.vue'
import KanbanItem from './components/KanbanItem.vue'
import { ref, computed } from 'vue'
import { Task } from './types'

const tasks = ref<Task[]>([]);

const backlogTasks = computed(() => tasks.value.filter(task => task.status === 'backlog'));
const todoTasks = computed(() => tasks.value.filter(task => task.status === 'todo'));
const inProgressTasks = computed(() => tasks.value.filter(task => task.status === 'in-progress'));
const reviewTasks = computed(() => tasks.value.filter(task => task.status === 'review'));
const doneTasks = computed(() => tasks.value.filter(task => task.status === 'done'));

const handleAddTask = (status: Task["status"], title: string, description: string) => {
  const newTask = {
    id: tasks.value.length + 1,
    title,
    description,
    status
  };
  tasks.value.push(newTask);
};

const handleDeleteTask = (id: string) => {
  tasks.value = tasks.value.filter(task => task.id !== id);
};
</script>

<template>
  <main className="flex flex-col items-center min-h-screen bg-gray-100 p-4 overflow-x-auto">
    <h1 className="text-4xl text-center font-bold">Kanban Board (Vue)</h1>
    <div className="flex flex-1 gap-4 mt-4">
      <KanbanCol title="Backlog">
        <KanbanItem v-for="task in backlogTasks" :key="task.id" :task="task"
          @delete="handleDeleteTask" />
        <KanbanInput @add="({ title, description }) => handleAddTask('backlog', title, description)" />
      </KanbanCol>
      <KanbanCol title="To Do">
        <KanbanItem v-for="task in todoTasks" :key="task.id" :task="task"
          @delete="handleDeleteTask" />
        <KanbanInput @add="({ title, description }) => handleAddTask('todo', title, description)" />
      </KanbanCol>
      <KanbanCol title="In Progress">
        <KanbanItem v-for="task in inProgressTasks" :key="task.id" :task="task"
          @delete="handleDeleteTask" />
        <KanbanInput @add="({ title, description }) => handleAddTask('in-progress', title, description)" />
      </KanbanCol>
      <KanbanCol title="Review">
        <KanbanItem v-for="task in reviewTasks" :key="task.id" :task="task"
          @delete="handleDeleteTask" />
        <KanbanInput @add="({ title, description }) => handleAddTask('review', title, description)" />
      </KanbanCol>
      <KanbanCol title="Done">
        <KanbanItem v-for="task in doneTasks" :key="task.id" :task="task"
          @delete="handleDeleteTask" />
        <KanbanInput @add="({ title, description }) => handleAddTask('done', title, description)" />
      </KanbanCol>
    </div>
  </main>
</template>
