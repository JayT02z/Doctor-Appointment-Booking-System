import { cn } from '../../lib/utils';

export const Textarea = ({ className, ...props }) => {
    return (
        <textarea
            className={cn(
                'min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                className
            )}
            {...props}
        />
    );
};
