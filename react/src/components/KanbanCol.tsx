import { Droppable } from "@hello-pangea/dnd";

interface KanbanColProps {
    title: string;
    children: React.ReactNode;
}

export default function KanbanCol({ title, children }: KanbanColProps) {
    return (
        <Droppable droppableId={title} type="task" direction="vertical">
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col items-center shrink-0 border border-neutral-300 bg-neutral-200 rounded-lg w-[350px] overflow-hidden [&:nth-child(1)>.kanban-col-title]:bg-pink-200 [&:nth-child(3)>.kanban-col-title]:bg-amber-200 [&:nth-child(4)>.kanban-col-title]:bg-lime-300 [&:nth-child(5)>.kanban-col-title]:bg-cyan-200">
                    <div className="kanban-col-title w-full py-4 bg-red-300">
                        <h2 className="text-2xl font-bold text-center">{title}</h2>
                    </div>
                    <div className="w-full px-2">
                        {children}
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}