'use client';

import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context';
import { loginUser } from '@/lib/api';

export default function LoginPage() {
  const { user, setToken, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/shop');
    }
  }, [user, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await loginUser(email, password);
      const { token, name, email: userEmail, role } = data;
      setToken(token);
      setUser({ name, email: userEmail, role });
      router.push('/shop');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Invalid credentials, please try again.');
    }
  };

  return (
    <section className="mx-auto max-w-2xl rounded-[2rem] border border-black/10 bg-white/90 p-10 shadow-luxe">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.28em] text-stone">Member login</p>
        <h1 className="text-3xl font-serif font-semibold text-charcoal">Access your Elixira account.</h1>
        <p className="text-sm text-stone">Sign in to review orders, manage your profile, and checkout securely.</p>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-charcoal">Email</label>
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required className="w-full rounded-3xl border border-black/10 bg-ivory px-4 py-4 text-sm text-charcoal outline-none" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-charcoal">Password</label>
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required className="w-full rounded-3xl border border-black/10 bg-ivory px-4 py-4 text-sm text-charcoal outline-none" />
        </div>
        {error && <p className="rounded-3xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
        <button type="submit" className="w-full rounded-full bg-charcoal px-6 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-ivory transition hover:bg-black">
          Sign in
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-stone">
        Need an account?{' '}
        <Link href="/register" className="font-medium text-charcoal underline underline-offset-4">
          Register here
        </Link>
      </p>
    </section>
  );
}
