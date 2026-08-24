import { Eye, EyeOff } from 'lucide-react';
import * as React from 'react';
import { ThemedInput } from '@/components/form-field';
import { cn } from '@/lib/utils';

export default function PasswordInput({
    className,
    ref,
    ...props
}: Omit<React.ComponentProps<'input'>, 'type'> & {
    ref?: React.Ref<HTMLInputElement>;
}) {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <div className="relative">
            <ThemedInput
                type={showPassword ? 'text' : 'password'}
                className={cn('pr-11', className)}
                ref={ref}
                {...props}
            />
            <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center rounded-r-xl px-3.5 text-gray-500 transition-colors hover:text-[#14532D] focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
            >
                {showPassword ? (
                    <EyeOff className="size-4" />
                ) : (
                    <Eye className="size-4" />
                )}
            </button>
        </div>
    );
}
