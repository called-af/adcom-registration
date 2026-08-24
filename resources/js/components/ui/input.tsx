import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.ComponentProps<'input'> {
    isError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, isError, type, ...props }, ref) => {
        return (
            <input
                ref={ref}
                type={type}
                data-slot="input"
                className={cn(
                    'flex h-9.5 w-full rounded-xl bg-[#E7EEE6] px-3.5 py-1.5 text-sm font-medium text-gray-900 placeholder:text-gray-400',
                    'border border-[#B7CDB0] transition-colors duration-150 outline-none',
                    'focus:border-[#14532D] focus:bg-[#EBF2EA]',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    isError &&
                        'border-red-500 focus:border-red-500',
                    className,
                )}
                {...props}
            />
        );
    },
);
Input.displayName = 'Input';

export { Input };
