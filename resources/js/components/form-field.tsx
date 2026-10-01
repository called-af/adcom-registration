import { Check, ChevronDown } from 'lucide-react';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
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

export interface ThemedSelectProps {
    id?: string;
    name?: string;
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    isError?: boolean;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export interface SelectOption {
    value: string;
    label: string;
}

/** Parse <option> children into SelectOption[] */
function parseOptions(children: React.ReactNode): SelectOption[] {
    const opts: SelectOption[] = [];
    React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.type === 'option') {
            const { value, children: label } = child.props as {
                value: string;
                children: string;
            };
            if (value !== '') opts.push({ value, label: String(label) });
        }
    });
    return opts;
}

export function ThemedSelect({
    id,
    name,
    value = '',
    onChange,
    placeholder,
    isError,
    required,
    disabled,
    className,
    children,
}: ThemedSelectProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const options = parseOptions(children);
    const selected = options.find((o) => o.value === value);

    /* close on outside click */
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    /* close on Escape */
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, []);

    return (
        <div ref={ref} className={cn('relative', className)}>
            {/* Hidden native select for form submit & required validation */}
            <select
                id={id}
                name={name}
                value={value}
                required={required}
                disabled={disabled}
                onChange={() => {}}
                tabIndex={-1}
                aria-hidden
                className="sr-only"
            >
                <option value="" />
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>

            {/* Trigger button */}
            <button
                type="button"
                disabled={disabled}
                onClick={() => !disabled && setOpen((v) => !v)}
                className={cn(
                    'flex h-9.5 w-full items-center justify-between rounded-xl bg-[#E7EEE6] px-3.5 py-1.5 text-sm font-medium',
                    'border border-[#B7CDB0] transition-colors duration-150 outline-none',
                    open && 'border-[#14532D] bg-[#EBF2EA]',
                    isError && 'border-red-500',
                    disabled && 'cursor-not-allowed opacity-50',
                    selected ? 'text-gray-900' : 'text-gray-400',
                )}
            >
                <span className="truncate">
                    {selected ? selected.label : (placeholder ?? 'Pilih...')}
                </span>
                <ChevronDown
                    className={cn(
                        'ml-2 size-4 shrink-0 text-gray-400 transition-transform duration-200',
                        open && 'rotate-180',
                    )}
                />
            </button>

            {/* Dropdown list */}
            {open && (
                <div
                    className={cn(
                        'absolute z-50 mt-1.5 w-full overflow-hidden rounded-xl border border-[#B7CDB0] bg-white shadow-lg',
                        'animate-in fade-in-0 zoom-in-95 duration-100',
                    )}
                >
                    <div className="p-1">
                        {options.map((o) => {
                            const isActive = o.value === value;
                            return (
                                <button
                                    key={o.value}
                                    type="button"
                                    onClick={() => {
                                        onChange?.(o.value);
                                        setOpen(false);
                                    }}
                                    className={cn(
                                        'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors duration-100',
                                        isActive
                                            ? 'bg-[#D6E6D3] text-[#14532D]'
                                            : 'text-gray-700 hover:bg-[#E7EEE6]',
                                    )}
                                >
                                    <span>{o.label}</span>
                                    {isActive && (
                                        <Check className="size-3.5 shrink-0 stroke-[3] text-[#14532D]" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

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
