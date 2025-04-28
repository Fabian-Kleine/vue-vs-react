import { cn } from "../../lib/utils"

export default function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string
}) {
  return (
    <textarea
      className={cn(
        "w-full rounded-md border border-slate-300 bg-transparent transition-shadow px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}