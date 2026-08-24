import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommunityLogoProps {
    className?: string;
    variant?: 'white' | 'dark' | 'sage';
    size?: 'sm' | 'md' | 'lg';
    city?: string;
}

export function CommunityLogo({
    className,
    variant = 'white',
    size = 'md',
    city = 'Cirebon',
}: CommunityLogoProps) {
    const sizeConfig = {
        sm: {
            container: 'px-2.5 py-1 text-[11px] gap-1.5',
            iconBox: 'size-3.5',
            icon: 'size-2.5',
        },
        md: {
            container: 'px-3.5 py-1.5 text-xs gap-2',
            iconBox: 'size-4',
            icon: 'size-3',
        },
        lg: {
            container: 'px-4 py-2 text-sm gap-2.5',
            iconBox: 'size-5',
            icon: 'size-3.5',
        },
    }[size];

    const variantConfig = {
        white: {
            badge: 'bg-white text-[#14532D] shadow-md border border-gray-100',
            iconBox: 'bg-[#14532D] text-white',
            cityBorder: 'border-emerald-300 text-emerald-800/80',
        },
        dark: {
            badge: 'bg-[#14532D] text-white shadow-md border border-emerald-800',
            iconBox: 'bg-white text-[#14532D]',
            cityBorder: 'border-emerald-700 text-emerald-200/80',
        },
        sage: {
            badge: 'bg-[#E7EEE6] text-[#14532D] shadow-xs border border-[#B7CDB0]',
            iconBox: 'bg-[#14532D] text-white',
            cityBorder: 'border-[#B7CDB0] text-emerald-800/80',
        },
    }[variant];

    return (
        <div
            className={cn(
                'inline-flex items-center rounded-full font-bold select-none',
                variantConfig.badge,
                sizeConfig.container,
                className,
            )}
        >
            <div
                className={cn(
                    'flex shrink-0 items-center justify-center rounded-full',
                    variantConfig.iconBox,
                    sizeConfig.iconBox,
                )}
            >
                <Bot className={cn('stroke-[2.5]', sizeConfig.icon)} />
            </div>
            <span className="font-black tracking-tight">
                androidDev Community
            </span>
            {city && (
                <span
                    className={cn(
                        'border-l pl-2 font-medium',
                        variantConfig.cityBorder,
                    )}
                >
                    {city}
                </span>
            )}
        </div>
    );
}
