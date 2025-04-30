import KanbanCol from "./components/KanbanCol"
import Button from "./components/common/Button"
import { Task } from "./types"
import KanbanItem from "./components/KanbanItem"
import { DragDropContext, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import { Plus } from "lucide-react"
import useStorage from "./lib/useStorage"
import VisitVue from "./components/VisitVue";

const columns: { title: string; status: Task['status'] }[] = [
  { title: 'Backlog', status: 'backlog' },
  { title: 'To Do', status: 'todo' },
  { title: 'In Progress', status: 'in-progress' },
  { title: 'Review', status: 'review' },
  { title: 'Done', status: 'done' },
];

function App() {
  const [tasks, setTasks] = useStorage<Task[]>('tasks_react', []);

  const handleAddTask = (status: Task['status']) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: '',
      description: '',
      status,
    }
    setTasks([...tasks, newTask]);
  }

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleUpdateTask = (updatedTask: Task) => {
    console.log(updatedTask);
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  }

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)) {
      return;
    }

    const task = tasks.find(task => task.id === draggableId);
    if (!task) return;

    const updatedTasks = [...tasks];

    const filteredTasks = updatedTasks.filter(t => t.id !== draggableId);

    if (destination.droppableId !== source.droppableId) {
      const newStatus = columns.find(col => col.title === destination.droppableId)?.status;
      if (!newStatus) return;

      const updatedTask = { ...task, status: newStatus };

      const tasksInDestination = filteredTasks.filter(t => t.status === newStatus);
      const tasksBeforeIndex = tasksInDestination.slice(0, destination.index);
      const tasksAfterIndex = tasksInDestination.slice(destination.index);

      setTasks([
        ...filteredTasks.filter(t => t.status !== newStatus),
        ...tasksBeforeIndex,
        updatedTask,
        ...tasksAfterIndex
      ]);
    }

    else {
      const sameStatusTasks = filteredTasks.filter(t => t.status === task.status);

      sameStatusTasks.splice(destination.index, 0, task);

      setTasks([
        ...filteredTasks.filter(t => t.status !== task.status),
        ...sameStatusTasks
      ]);
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-100 p-4 w-fit min-w-screen">
      <h1 className="text-4xl text-center font-bold">Kanban Board (React)</h1>
      <div className="flex gap-4 mt-4 flex-1 w-full px-2">
        <DragDropContext onDragEnd={handleDragEnd}>
          {columns.map((column, colIndex) => {
            const columnTasks = tasks.filter(task => task.status === column.status);
            return (
              <KanbanCol key={colIndex} title={column.title}>
                {columnTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <KanbanItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} key={task.id} {...task} onDelete={handleDeleteTask} onUpdateTask={handleUpdateTask} />
                    )}
                  </Draggable>
                ))}
                <Draggable key={`add-${column.status}`} isDragDisabled draggableId={`add-${column.status}`} index={columnTasks.length}>
                  {(provided) => (
                    <Button ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="mt-4 w-full" variant="primary" onClick={() => handleAddTask(column.status)}>
                      <Plus className="mx-auto" />
                      <span className="sr-only">Add Task</span>
                    </Button>
                  )}
                </Draggable>
              </KanbanCol>
            );
          })}
        </DragDropContext>
      </div>
      <VisitVue />
    </main>
  )
}

export default App
