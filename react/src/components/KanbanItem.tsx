import { Task } from "../types"
import { Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import KanbanInput from "./KanbanInput";

type KanbanItemProps = Task & React.HTMLAttributes<HTMLDivElement> & {
    onDelete?: (id: string) => void;
    onUpdateTask?: (task: Task) => void;
    ref: React.Ref<HTMLDivElement>;
};


export default function KanbanItem({
    id,
    title,
    description,
    status,
    onDelete,
    onUpdateTask,
    ref,
    ...props
}: KanbanItemProps) {
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = () => {
        if (onDelete) {
            onDelete(id);
        }
    }

    const handleCancel = () => {
        if (title == "") {
            handleDelete();
            return;
        }
        setIsEditing(false);
    }

    const handleUpdateTask = (title: string, description: string) => {
        setIsEditing(false);
        if (onUpdateTask) {
            const newTask: Task = {
                id,
                title,
                description,
                status,
            };
            onUpdateTask(newTask);
        }
    }

    useEffect(() => {
        if (!title) {
            setIsEditing(true);
        }
    }, [title]);

    if (isEditing) {
        return (
            <KanbanInput ref={ref} defaultValues={{ title, description }} onCancel={handleCancel} onAddTask={({ title, description }) => handleUpdateTask(title, description)} />
        )
    }

    return (
        <div ref={ref} className="relative flex flex-col my-2 p-2 rounded bg-gray-100 border border-neutral-300" {...props}>
            <div className="absolute top-2 right-2 flex gap-1">
                <button onClick={() => setIsEditing(true)} className="cursor-pointer p-1 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300" title="Edit Task" aria-label="Edit task">
                    <Pencil className="w-4 h-4 text-gray-600" />
                </button>
                <button onClick={handleDelete} className="cursor-pointer p-1 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300" title="Delete Task" aria-label="Delete task">
                    <Trash2 className="w-4 h-4 text-gray-600" />
                </button>
            </div>
            <h3 className="text-lg font-semibold break-words max-w-[80%]">{title}</h3>
            <p className="text-gray-600 break-words max-w-[80%]">{description}</p>
        </div>
    )
}