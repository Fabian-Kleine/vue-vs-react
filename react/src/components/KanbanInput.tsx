import Button from "./common/Button"
import Input from "./common/Input"
import Textarea from "./common/Textarea"
import { useState } from "react"

interface KanbanInputProps extends React.HTMLAttributes<HTMLDivElement> {
    onAddTask: (task: { title: string; description: string }) => void;
    onCancel?: () => void;
    ref?: React.Ref<HTMLDivElement>;
    defaultValues?: { title: string; description: string };
}

export default function KanbanInput({ onAddTask, defaultValues, ref, ...props }: KanbanInputProps) {
    const [title, setTitle] = useState(defaultValues?.title || "");
    const [description, setDescription] = useState(defaultValues?.description || "");

    const handleAddTask = () => {
        if (title) {
            onAddTask({ title, description });
            setTitle("");
            setDescription("");
        }
    }

    const handleCancel = () => {
        if (props.onCancel) {
            props.onCancel();
        }
    }

    return (
        <div ref={ref} className="flex flex-col gap-2 my-2 p-2 rounded bg-gray-100 border border-neutral-300" {...props}>
            <Input className="font-bold" value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="Task Title" />
            <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Task Description" />
            <div className="flex justify-center gap-2">
                <Button className="flex-1" variant="secondary" onClick={handleCancel}>Cancel</Button>
                <Button className="flex-1" variant="primary" onClick={handleAddTask}>Save</Button>
            </div>
        </div>
    )
}