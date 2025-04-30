<template>
  <main class="flex flex-col items-center min-h-screen bg-gray-100 p-4 w-fit min-w-screen">
    <h1 class="text-4xl text-center font-bold">Kanban Board (Vue)</h1>
    <div class="flex gap-4 mt-4 flex-1 w-full px-2">
      <!-- Iterate over columns -->
      <KanbanCol v-for="column in columns" :key="column.status" :title="column.title" @drop="drop($event, column.status)">
        <!-- Pass filtered tasks to KanbanItem loop -->
        <KanbanItem v-for="task in getTasksByStatus(column.status)" :key="task.id" :task="task"
          @delete="handleDeleteTask" @update="handleUpdateTask" @dragstart="drag($event, task)" @reorder="handleReorderTask"
          @changeStatusAndReorder="handleChangeStatusAndReorder" />
        <!-- Dynamically set status for adding tasks -->
        <Button class="w-full mt-2" variant="primary" @click="handleAddTask(column.status)">
          <Plus class="mx-auto" />
          <span class="sr-only">Add Task</span>
        </Button>
      </KanbanCol>
    </div>
    <VisitReact />
  </main>
</template>

<script setup lang="ts">
import KanbanCol from './components/KanbanCol.vue'
import KanbanItem from './components/KanbanItem.vue'
import Button from './components/common/Button.vue'
import { useStorage } from './lib/useStorage'
import type { Task } from './types'
import { Plus } from 'lucide-vue-next'
import VisitReact from './components/ExternalLinks.vue'

const tasks = useStorage<Task[]>('tasks_vue', []);

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
    console.error("Reorder: Dragged or target task not found");
    return;
  }

  const draggedTask = tasks.value[originalDraggedIndex];
  const targetTask = tasks.value[originalTargetIndex];

  if (draggedTask.status !== targetTask.status) {
    console.warn("handleReorderTask called for tasks in different columns. This should be handled by changeStatusAndReorder.");
    return;
  }

  tasks.value.splice(originalDraggedIndex, 1);

  const finalTargetIndex = tasks.value.findIndex(task => task.id === targetId);
  if (finalTargetIndex === -1) {
    console.error("Reorder: Target task disappeared after splice?");
    tasks.value.push(draggedTask);
    return;
  }

  if (originalDraggedIndex > originalTargetIndex) {
    tasks.value.splice(finalTargetIndex , 0, draggedTask);
    return;
  }

  tasks.value.splice(finalTargetIndex + 1, 0, draggedTask);
};

const handleChangeStatusAndReorder = ({ draggedId, targetId, newStatus }: { draggedId: string, targetId: string, newStatus: Task['status'] }) => {
  const draggedIndex = tasks.value.findIndex(task => task.id === draggedId);
  const targetIndex = tasks.value.findIndex(task => task.id === targetId);

  if (draggedIndex === -1 || targetIndex === -1) {
    console.error("ChangeStatus: Dragged or target task not found");
    return;
  }

  const draggedTask = tasks.value[draggedIndex];

  draggedTask.status = newStatus;

  tasks.value.splice(draggedIndex, 1);

  const finalTargetIndex = tasks.value.findIndex(task => task.id === targetId);
  if (finalTargetIndex === -1) {
    console.error("ChangeStatus: Target task disappeared after splice?");
    tasks.value.push(draggedTask);
    return;
  }

  tasks.value.splice(finalTargetIndex + 1, 0, draggedTask);
};

const drag = (event: DragEvent, task: Task) => {
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', JSON.stringify({ id: task.id, status: task.status }));
  }
};

const drop = (event: DragEvent, status: Task['status']) => {
  if (event.dataTransfer) {
    const data = JSON.parse(event.dataTransfer.getData('text/plain'));
    const taskId = data.id;
    const task = tasks.value.find(task => task.id === taskId);

    if (task && task.status !== status) {
      const originalIndex = tasks.value.findIndex(t => t.id === taskId);

      task.status = status;

      if (originalIndex !== -1) {
        tasks.value.splice(originalIndex, 1);
      }
      tasks.value.push(task);
    }
  }
};
</script>
