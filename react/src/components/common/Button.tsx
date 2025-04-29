import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: 'primary' | 'secondary' | 'destructive';
    ref?: React.Ref<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
    className = '',
    children,
    variant = 'primary',
    ref,
    ...props
}) => {
    let variantClass = 'bg-blue-500 hover:bg-blue-600 ring-blue-400';

    if (variant === 'secondary') {
        variantClass = 'bg-gray-500 hover:bg-gray-600 ring-gray-400';
    } else if (variant === 'destructive') {
        variantClass = 'bg-red-500 hover:bg-red-600 ring-red-400';
    }

    return (
        <button
            className={cn('transition-colors text-white px-4 py-2 rounded focus:ring-4 cursor-pointer', variantClass, className)}
            ref={ref}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
