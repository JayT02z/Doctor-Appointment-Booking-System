import { cn } from '../../lib/utils';

export const Button = ({ children, className, variant = 'default', ...props }) => {
    const base = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
    const variants = {
        default: 'bg-blue-600 text-white hover:bg-blue-700',
        outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
    };
    return (
        <button className={cn(base, variants[variant], className)} {...props}>
            {children}
        </button>
    );
};