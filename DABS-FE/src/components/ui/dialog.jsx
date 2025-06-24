// ✅ FILE: components/ui/dialog.jsx

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogContent = ({ className, children, ...props }) => (
    <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm" />
        <DialogPrimitive.Content
            {...props}
            className={cn(
                'fixed z-50 left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg focus:outline-none',
                className
            )}
        >
            {children}
            <DialogPrimitive.Close className="absolute top-4 right-4 text-gray-500 hover:text-black">
                <X className="h-5 w-5" />
            </DialogPrimitive.Close>
        </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
);

export const DialogHeader = ({ children, className }) => (
    <div className={cn('mb-4', className)}>{children}</div>
);

export const DialogTitle = ({ children, className }) => (
    <h2 className={cn('text-lg font-semibold text-gray-900', className)}>{children}</h2>
);