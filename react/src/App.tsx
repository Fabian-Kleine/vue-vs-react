import KanbanCol from "./components/KanbanCol"
import Button from "./components/common/Button"
import { useState } from "react"
import { Task } from "./types"
import KanbanItem from "./components/KanbanItem"
import { DragDropContext, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

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
    const { destination, draggableId } = result;

    // If there's no destination 
    if (!destination) {
      return;
    }

    // Find the task that was dragged
    const task = tasks.find(task => task.id === draggableId);
    if (!task) return;

    // Get column id from droppableId
    const destinationColumnId = destination.droppableId;

    // Set the new status based on destination column
    let newStatus: Task['status'];
    switch (destinationColumnId) {
      case 'Backlog':
        newStatus = 'backlog';
        break;
      case 'To Do':
        newStatus = 'todo';
        break;
      case 'In Progress':
        newStatus = 'in-progress';
        break;
      case 'Review':
        newStatus = 'review';
        break;
      case 'Done':
        newStatus = 'done';
        break;
      default:
        return; // Invalid destination
    }

    // Update the task with the new status
    const updatedTasks = tasks.map(t =>
      t.id === task.id ? { ...t, status: newStatus } : t
    );

    setTasks(updatedTasks);
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-100 p-4 overflow-hidden">
      <h1 className="text-4xl text-center font-bold">Kanban Board (React)</h1>
      <div className="flex gap-4 mt-4 flex-1 overflow-x-auto w-full max-w-full px-2">
        <DragDropContext onDragEnd={handleDragEnd}>
          <KanbanCol title="Backlog">
            {tasks.filter(task => task.status === 'backlog').map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <KanbanItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} key={task.id} {...task} onDelete={handleDeleteTask} onUpdateTask={handleUpdateTask} />
                )}
              </Draggable>
            ))}
            <Draggable key="add-task-backlog" isDragDisabled draggableId="add-task-backlog" index={tasks.length}>
              {(provided) => (
                <Button className="mt-4 w-full" variant="primary" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={() => handleAddTask('backlog')}>
                  Add Task
                </Button>
              )}
            </Draggable>
          </KanbanCol>
          <KanbanCol title="To Do">
            {tasks.filter(task => task.status === 'todo').map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <KanbanItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} key={task.id} {...task} onDelete={handleDeleteTask} onUpdateTask={handleUpdateTask} />
                )}
              </Draggable>
            ))}
            <Draggable key="add-task-todo" isDragDisabled draggableId="add-task-todo" index={tasks.length + 1}>
              {(provided) => (
                <Button className="mt-4 w-full" variant="primary" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={() => handleAddTask('todo')}>
                  Add Task
                </Button>
              )}
            </Draggable>
          </KanbanCol>
          <KanbanCol title="In Progress">
            {tasks.filter(task => task.status === 'in-progress').map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <KanbanItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} key={task.id} {...task} onDelete={handleDeleteTask} onUpdateTask={handleUpdateTask} />
                )}
              </Draggable>
            ))}
            <Draggable key="add-task-in-progress" isDragDisabled draggableId="add-task-in-progress" index={tasks.length + 2}>
              {(provided) => (
                <Button className="mt-4 w-full" variant="primary" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={() => handleAddTask('in-progress')}>
                  Add Task
                </Button>
              )}
            </Draggable>
          </KanbanCol>
          <KanbanCol title="Review">
            {tasks.filter(task => task.status === 'review').map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <KanbanItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} key={task.id} {...task} onDelete={handleDeleteTask} onUpdateTask={handleUpdateTask} />
                )}
              </Draggable>
            ))}
            <Draggable key="add-task-review" isDragDisabled draggableId="add-task-review" index={tasks.length + 3}>
              {(provided) => (
                <Button className="mt-4 w-full" variant="primary" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={() => handleAddTask('review')}>
                  Add Task
                </Button>
              )}
            </Draggable>
          </KanbanCol>
          <KanbanCol title="Done">
            {tasks.filter(task => task.status === 'done').map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <KanbanItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} key={task.id} {...task} onDelete={handleDeleteTask} onUpdateTask={handleUpdateTask} />
                )}
              </Draggable>
            ))}
            <Draggable key="add-task-done" isDragDisabled draggableId="add-task-done" index={tasks.length + 4}>
              {(provided) => (
                <Button className="mt-4 w-full" variant="primary" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={() => handleAddTask('done')}>
                  Add Task
                </Button>
              )}
            </Draggable>
          </KanbanCol>
        </DragDropContext>
      </div>
    </main>
  )
}

export default App
