import { Form, Head } from '@inertiajs/react';
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
    return (
        <>
            <Head title="Log in" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-5"
            >
                {({ processing, errors }) => (
                    <>
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
                                />
                            </FormField>

                            <div className="pt-1">
                                <ThemedCheckbox
                                    id="remember"
                                    name="remember"
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
                                    data-test="login-button"
                                >
                                    Masuk ke Akun
                                </ThemedButton>
                            </div>
                        </div>
                    </>
                )}
            </Form>

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
