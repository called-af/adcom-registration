import { Head, useForm } from '@inertiajs/react';
import { LogIn } from 'lucide-react';
import {
    FormField,
    ThemedCheckbox,
    ThemedInput,
} from '@/components/form-field';
import PasswordInput from '@/components/password-input';
import { ThemedButton } from '@/components/themed-button';
import { store } from '@/routes/login';

type Props = {
    status?: string;
    canResetPassword?: boolean;
};

export default function Login({ status }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store.url(), {
            onFinish: () => setData('password', ''),
        });
    };

    return (
        <>
            <Head title="Log in" />

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="space-y-4">
                    <FormField
                        label="EMAIL ADDRESS"
                        htmlFor="email"
                        error={errors.email}
                        required
                    >
                        <ThemedInput
                            id="email"
                            type="email"
                            name="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            placeholder="admin@ukmandroid.dev"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            isError={!!errors.email}
                        />
                    </FormField>

                    <FormField
                        label="PASSWORD"
                        htmlFor="password"
                        error={errors.password}
                        required
                    >
                        <PasswordInput
                            id="password"
                            name="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            placeholder="••••••••"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </FormField>

                    <div className="pt-1">
                        <ThemedCheckbox
                            id="remember"
                            checked={data.remember}
                            onChange={(checked) => setData('remember', checked)}
                            label="Ingat saya di perangkat ini"
                        />
                    </div>

                    <div className="pt-2">
                        <ThemedButton
                            type="submit"
                            className="h-12 w-full text-sm"
                            tabIndex={4}
                            loading={processing}
                            loadingText="Masuk ke Akun..."
                            icon={<LogIn className="size-4" />}
                        >
                            Masuk ke Akun
                        </ThemedButton>
                    </div>
                </div>
            </form>

            {status && (
                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center text-xs font-semibold text-emerald-800">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    title: 'Login Pengurus & Admin',
    description: 'Masukkan email dan password untuk masuk ke dashboard admin.',
};
