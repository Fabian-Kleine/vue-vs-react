import Button from "./common/Button"
import Input from "./common/Input"
import Textarea from "./common/Textarea"

export default function KanbanInput() {
    return (
        <div className="flex flex-col gap-2 m-2 p-2 rounded bg-gray-100 border border-neutral-300">
            <Input type="text" placeholder="Task Title" />
            <Textarea placeholder="Task Description" />
            <Button variant="primary">Add Task</Button>
        </div>
    )
}