import { Task } from "../types"
import { Trash2 } from "lucide-react";

type KanbanItemProps = Task & React.HTMLAttributes<HTMLDivElement> & {
    onDelete?: (id: string) => void;
};


export default function KanbanItem({
    id,
    title,
    description,
    onDelete,
}: KanbanItemProps) {
    const handleDelete = () => {
        if (onDelete) {
            onDelete(id);
        }
    }

    return (
        <div className="relative flex flex-col gap-2 m-2 p-2 rounded bg-gray-100 border border-neutral-300">
            <button onClick={handleDelete} className="absolute cursor-pointer top-2 right-2 p-1 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300" title="Delete Task" aria-label="Delete task">
                <Trash2 className="w-4 h-4 text-gray-600" />
            </button>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    )
}