import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Select = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;

export const SelectTrigger = ({ children, className, ...props }) => (
    <SelectPrimitive.Trigger
        className={cn('flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm', className)}
        {...props}
    >
        {children}
        <ChevronDown className="h-4 w-4 text-gray-500 ml-2" />
    </SelectPrimitive.Trigger>
);

export const SelectContent = ({ children, className, ...props }) => (
    <SelectPrimitive.Portal>
        <SelectPrimitive.Content
            {...props}
            className={cn('z-50 mt-1 w-full rounded-md border bg-white p-1 text-sm shadow-md', className)}
        >
            {children}
        </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
);

export const SelectItem = ({ children, className, ...props }) => (
    <SelectPrimitive.Item
        className={cn('cursor-pointer select-none rounded px-3 py-1.5 hover:bg-gray-100 focus:outline-none focus:bg-gray-100', className)}
        {...props}
    >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
);
