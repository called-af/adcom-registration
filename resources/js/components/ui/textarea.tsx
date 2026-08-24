import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.ComponentProps<'textarea'> {
    isError?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, isError, ...props }, ref) => {
        return (
            <textarea
                ref={ref}
                data-slot="textarea"
                className={cn(
                    'flex min-h-[54px] w-full rounded-xl bg-[#E7EEE6] px-3.5 py-1.5 text-sm font-medium text-gray-900 placeholder:text-gray-400',
                    'resize-none border border-[#B7CDB0] transition-colors duration-150 outline-none',
                    'focus:border-[#14532D] focus:bg-[#EBF2EA]',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    isError &&
                        'border-red-500 focus:border-red-500 ',
                    className,
                )}
                {...props}
            />
        );
    },
);
Textarea.displayName = 'Textarea';

export { Textarea };
