import { Check } from 'lucide-react';
import * as React from 'react';
import { Input, type InputProps } from '@/components/ui/input';
import { Textarea, type TextareaProps } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface FormFieldProps {
    label?: string;
    htmlFor?: string;
    error?: string;
    rightAction?: React.ReactNode;
    hint?: string;
    required?: boolean;
    className?: string;
    children: React.ReactNode;
}

export function FormField({
    label,
    htmlFor,
    error,
    rightAction,
    hint,
    required = false,
    className,
    children,
}: FormFieldProps) {
    return (
        <div className={cn('space-y-1.5', className)}>
            {(label || rightAction) && (
                <div className="flex items-center justify-between">
                    {label && (
                        <label
                            htmlFor={htmlFor}
                            className="text-[11px] font-bold tracking-wider text-[#14532D] uppercase select-none"
                        >
                            {label}
                            {required && (
                                <span className="ml-0.5 text-red-500">*</span>
                            )}
                        </label>
                    )}
                    {rightAction && <div>{rightAction}</div>}
                    {!rightAction && hint && (
                        <span className="text-[11px] font-medium text-gray-400">
                            {hint}
                        </span>
                    )}
                </div>
            )}

            {children}

            {error && (
                <p className="animate-in text-xs font-medium text-red-600 duration-200 fade-in-50">
                    {error}
                </p>
            )}
        </div>
    );
}

export type ThemedInputProps = InputProps;
export const ThemedInput = Input;

export type ThemedTextareaProps = TextareaProps;
export const ThemedTextarea = Textarea;

export interface ThemedCheckboxProps {
    id?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    label?: React.ReactNode;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

export function ThemedCheckbox({
    id,
    checked = false,
    onChange,
    label,
    name,
    required = false,
    disabled = false,
    className,
}: ThemedCheckboxProps) {
    return (
        <label
            className={cn(
                'group flex cursor-pointer items-start gap-3 select-none',
                disabled && 'cursor-not-allowed opacity-60',
                className,
            )}
        >
            <div className="relative mt-0.5 flex shrink-0 items-center justify-center">
                <input
                    id={id}
                    name={name}
                    type="checkbox"
                    required={required}
                    disabled={disabled}
                    checked={checked}
                    onChange={(e) => onChange?.(e.target.checked)}
                    className="sr-only"
                />
                <div
                    className={cn(
                        'flex size-5 items-center justify-center rounded-full border transition-all duration-200',
                        checked
                            ? 'border-[#14532D] bg-[#14532D] text-white shadow-xs'
                            : 'border-[#B7CDB0] bg-[#E7EEE6] group-hover:border-[#14532D]',
                    )}
                >
                    {checked && <Check className="size-3.5 stroke-[3]" />}
                </div>
            </div>
            {label && (
                <span className="text-xs leading-relaxed text-gray-700">
                    {label}
                </span>
            )}
        </label>
    );
}
