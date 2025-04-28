import KanbanCol from "./components/KanbanCol"
import KanbanInput from "./components/KanbanInput"

function App() {

  return (
    <main className="min-h-screen bg-gray-100 p-4 overflow-x-auto">
      <h1 className="text-4xl text-center font-bold">Kanban Board</h1>
      <div className="flex gap-4 mt-4">
        <KanbanCol title="Backlog">
          <KanbanInput />
        </KanbanCol>
        <KanbanCol title="To Do">
          <KanbanInput />
        </KanbanCol>
        <KanbanCol title="In Progress">
          <KanbanInput />
        </KanbanCol>
        <KanbanCol title="Review">
          <KanbanInput />
        </KanbanCol>
        <KanbanCol title="Done">
          <KanbanInput />
        </KanbanCol>
      </div>
    </main>
  )
}

export default App
