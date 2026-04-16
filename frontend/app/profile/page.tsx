'use client';

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context';
import { fetchUserProfile, updateUserProfile } from '@/lib/api';

export default function ProfilePage() {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) {
      fetchUserProfile().then((response) => {
        setName(response.data.name);
        setEmail(response.data.email);
      }).catch(() => {
        setMessage('Please login to view your profile.');
      });
    }
  }, [user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await updateUserProfile({ name, email, password: password || undefined });
      setUser(response.data);
      setMessage('Your profile was updated successfully.');
    } catch {
      setMessage('Unable to update profile.');
    }
  };

  return (
    <section className="mx-auto max-w-3xl space-y-8 rounded-[2rem] border border-black/10 bg-white/90 p-8 shadow-luxe">
      <div>
        <p className="text-sm uppercase tracking-[0.28em] text-stone">Account</p>
        <h1 className="mt-3 text-3xl font-serif font-semibold text-charcoal">Your profile</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-charcoal">Name</label>
          <input value={name} onChange={(event) => setName(event.target.value)} required className="w-full rounded-3xl border border-black/10 bg-ivory px-4 py-4 text-sm text-charcoal outline-none" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-charcoal">Email</label>
          <input value={email} onChange={(event) => setEmail(event.target.value)} required className="w-full rounded-3xl border border-black/10 bg-ivory px-4 py-4 text-sm text-charcoal outline-none" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-charcoal">New password</label>
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="w-full rounded-3xl border border-black/10 bg-ivory px-4 py-4 text-sm text-charcoal outline-none" />
        </div>
        {message && <p className="rounded-3xl bg-ivory p-4 text-sm text-charcoal">{message}</p>}
        <button type="submit" className="rounded-full bg-charcoal px-6 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-ivory transition hover:bg-black">
          Save changes
        </button>
      </form>
    </section>
  );
}
