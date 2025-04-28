import KanbanCol from "./components/KanbanCol"

function App() {

  return (
    <main className="min-h-screen bg-gray-100 p-4 overflow-x-auto">
      <h1 className="text-4xl text-center font-bold">Kanban Board</h1>
      <div className="flex gap-4 mt-4">
        <KanbanCol title="Backlog">
          <span>test</span>
        </KanbanCol>
        <KanbanCol title="To Do">
          <span>test</span>
        </KanbanCol>
        <KanbanCol title="In Progress">
          <span>test</span>
        </KanbanCol>
        <KanbanCol title="Review">
          <span>test</span>
        </KanbanCol>
        <KanbanCol title="Done">
          <span>test</span>
        </KanbanCol>
      </div>
    </main>
  )
}

export default App
