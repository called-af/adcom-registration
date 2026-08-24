import * as React from 'react';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

export interface ThemedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    loadingText?: string;
    icon?: React.ReactNode;
}

export const ThemedButton = React.forwardRef<
    HTMLButtonElement,
    ThemedButtonProps
>(
    (
        {
            className,
            children,
            variant = 'primary',
            size = 'md',
            loading = false,
            loadingText,
            disabled,
            icon,
            ...props
        },
        ref,
    ) => {
        const baseClasses =
            'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-bold transition-all duration-150 active:scale-[0.99] cursor-pointer disabled:pointer-events-none disabled:opacity-50 outline-none select-none';

        const variantClasses = {
            primary:
                'bg-[#14532D] hover:bg-[#0E3D20] text-white shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#14532D]/40',
            secondary:
                'bg-[#E7EEE6] hover:bg-[#DDE7DB] text-[#14532D] border border-[#B7CDB0] focus-visible:ring-2 focus-visible:ring-[#14532D]/20',
            outline:
                'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 focus-visible:ring-2 focus-visible:ring-gray-300',
            ghost: 'bg-transparent hover:bg-[#E7EEE6] text-[#14532D]',
        }[variant];

        const sizeClasses = {
            sm: 'h-9 px-3.5 text-xs',
            md: 'h-11 px-5 text-sm',
            lg: 'h-12 px-6 text-base',
        }[size];

        return (
            <button
                ref={ref}
                disabled={disabled || loading}
                className={cn(
                    baseClasses,
                    variantClasses,
                    sizeClasses,
                    className,
                )}
                {...props}
            >
                {loading ? (
                    <>
                        <Spinner className="size-4" />
                        <span>{loadingText || 'Memproses...'}</span>
                    </>
                ) : (
                    <>
                        {children}
                        {icon && <span className="shrink-0">{icon}</span>}
                    </>
                )}
            </button>
        );
    },
);

ThemedButton.displayName = 'ThemedButton';
