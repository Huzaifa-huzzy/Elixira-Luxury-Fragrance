'use client';

import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context';
import { registerUser } from '@/lib/api';

export default function RegisterPage() {
  const { user, setToken, setUser } = useContext(AuthContext);
  const [name, setName] = useState('');
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
      const data = await registerUser(name, email, password);
      const { token, name: userName, email: userEmail, role } = data;
      setToken(token);
      setUser({ name: userName, email: userEmail, role });
      router.push('/shop');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Unable to register. Please verify your details.');
    }
  };

  return (
    <section className="mx-auto max-w-2xl rounded-[2rem] border border-black/10 bg-white/90 p-10 shadow-luxe">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.28em] text-stone">Create an account</p>
        <h1 className="text-3xl font-serif font-semibold text-charcoal">Join the Elixira fragrance experience.</h1>
        <p className="text-sm text-stone">Register now to save favorites, review orders, and complete checkout faster.</p>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-charcoal">Name</label>
          <input value={name} onChange={(event) => setName(event.target.value)} type="text" required className="w-full rounded-3xl border border-black/10 bg-ivory px-4 py-4 text-sm text-charcoal outline-none" />
        </div>
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
          Register
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-stone">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-charcoal underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </section>
  );
}
