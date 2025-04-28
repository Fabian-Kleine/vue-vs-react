import KanbanCol from "./components/KanbanCol"
import KanbanInput from "./components/KanbanInput"
import { useState } from "react"
import { Task } from "./types"
import KanbanItem from "./components/KanbanItem"

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (status: Task['status'], title: string, description: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status,
    }
    setTasks([...tasks, newTask])
  }

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4 overflow-x-auto">
      <h1 className="text-4xl text-center font-bold">Kanban Board (React)</h1>
      <div className="flex gap-4 mt-4">
        <KanbanCol title="Backlog">
          {tasks.filter(task => task.status === 'backlog').map(task => (
            <KanbanItem key={task.id} {...task} onDelete={handleDeleteTask} />
          ))}
          <KanbanInput onAddTask={({ title, description }) => handleAddTask('backlog', title, description)} />
        </KanbanCol>
        <KanbanCol title="To Do">
          {tasks.filter(task => task.status === 'todo').map(task => (
            <KanbanItem key={task.id} {...task} onDelete={handleDeleteTask} />
          ))}
          <KanbanInput onAddTask={({ title, description }) => handleAddTask('todo', title, description)} />
        </KanbanCol>
        <KanbanCol title="In Progress">
          {tasks.filter(task => task.status === 'in-progress').map(task => (
            <KanbanItem key={task.id} {...task} onDelete={handleDeleteTask} />
          ))}
          <KanbanInput onAddTask={({ title, description }) => handleAddTask('in-progress', title, description)} />
        </KanbanCol>
        <KanbanCol title="Review">
          {tasks.filter(task => task.status === 'review').map(task => (
            <KanbanItem key={task.id} {...task} onDelete={handleDeleteTask} />
          ))}
          <KanbanInput onAddTask={({ title, description }) => handleAddTask('review', title, description)} />
        </KanbanCol>
        <KanbanCol title="Done">
          {tasks.filter(task => task.status === 'done').map(task => (
            <KanbanItem key={task.id} {...task} onDelete={handleDeleteTask} />
          ))}
          <KanbanInput onAddTask={({ title, description }) => handleAddTask('done', title, description)} />
        </KanbanCol>
      </div>
    </main>
  )
}

export default App
