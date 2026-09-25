import { Palette, Code2, Server, Check } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface DivisionOption {
    id: string;
    title: string;
    description: string;
    icon: 'uiux' | 'frontend' | 'backend';
}

export const defaultDivisions: DivisionOption[] = [
    {
        id: 'uiux',
        title: 'UI/UX Designer',
        description:
            'Desain visual, wireframing, prototype, user research & design system',
        icon: 'uiux',
    },
    {
        id: 'frontend',
        title: 'Frontend Developer',
        description:
            'Slicing UI, responsive web, modern state management & animations',
        icon: 'frontend',
    },
    {
        id: 'backend',
        title: 'Backend Developer',
        description:
            'API design, database modeling, authentication & server logic',
        icon: 'backend',
    },
];

interface DivisionSelectProps {
    value: string;
    onChange: (value: string) => void;
    options?: DivisionOption[];
    error?: string;
    disabled?: boolean;
    compact?: boolean;
}

export function DivisionSelect({
    value,
    onChange,
    options = defaultDivisions,
    error,
    disabled = false,
    compact = false,
}: DivisionSelectProps) {
    const renderIcon = (type: DivisionOption['icon'], isSelected: boolean) => {
        const iconClasses = cn(
            compact ? 'size-4' : 'size-5',
            'transition-transform duration-200',
            isSelected
                ? 'scale-110 text-[#14532D]'
                : 'text-[#14532D]/75 group-hover:text-[#14532D]',
        );

        switch (type) {
            case 'uiux':
                return <Palette className={iconClasses} />;
            case 'frontend':
                return <Code2 className={iconClasses} />;
            case 'backend':
                return <Server className={iconClasses} />;
            default:
                return <Code2 className={iconClasses} />;
        }
    };

    return (
        <div className="space-y-1">
            <div
                className={cn('flex flex-col', compact ? 'gap-1.5' : 'gap-2')}
                role="radiogroup"
                aria-label="Pilihan Minat Divisi"
            >
                {options.map((option) => {
                    const isSelected = value === option.id;

                    return (
                        <button
                            key={option.id}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            disabled={disabled}
                            onClick={() => onChange(option.id)}
                            className={cn(
                                'group relative flex w-full cursor-pointer items-center justify-between rounded-xl border text-left transition-all duration-200 outline-none select-none',
                                compact ? 'px-3 py-1.5' : 'px-3.5 py-2',
                                isSelected
                                    ? 'border-[#14532D] bg-[#B7CDB0] text-gray-900 shadow-xs ring-1 ring-[#14532D]/30'
                                    : 'border-[#B7CDB0]/70 bg-[#E7EEE6] text-gray-800 hover:border-[#14532D]/40 hover:bg-[#DDE7DB]',
                                disabled && 'cursor-not-allowed opacity-60',
                            )}
                        >
                            <div className="flex items-center gap-2.5">
                                <div
                                    className={cn(
                                        'flex shrink-0 items-center justify-center rounded-lg transition-colors duration-200',
                                        compact ? 'size-6.5' : 'size-7.5',
                                        isSelected
                                            ? 'bg-white/80 text-[#14532D] shadow-xs'
                                            : 'bg-white/60 text-[#14532D] group-hover:bg-white',
                                    )}
                                >
                                    {renderIcon(option.icon, isSelected)}
                                </div>
                                <div>
                                    <div className="text-xs font-bold tracking-tight text-gray-900">
                                        {option.title}
                                    </div>
                                    <div className="line-clamp-1 text-[10.5px] font-normal text-gray-600">
                                        {option.description}
                                    </div>
                                </div>
                            </div>

                            <div
                                className={cn(
                                    'flex size-4 shrink-0 items-center justify-center rounded-full border transition-all duration-200',
                                    isSelected
                                        ? 'border-[#14532D] bg-[#14532D] text-white shadow-xs'
                                        : 'border-[#14532D]/40 bg-white/70 group-hover:border-[#14532D]',
                                )}
                            >
                                {isSelected && (
                                    <Check className="size-2.5 stroke-[3]" />
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
            {error && (
                <p className="text-xs font-medium text-red-600">{error}</p>
            )}
        </div>
    );
}
