'use client';

import type { Dispatch, SetStateAction } from 'react';

interface CartItemProps {
  id: string;
  image: string;
  name: string;
  price: number;
  qty: number;
  onQuantityChange: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

export function CartItem({ id, image, name, price, qty, onQuantityChange, onRemove }: CartItemProps) {
  return (
    <div className="flex flex-col gap-4 rounded-[1.5rem] border border-black/10 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-24 w-24 overflow-hidden rounded-3xl bg-slate-100">
          <img src={image} alt={name} className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-stone">{name}</p>
          <p className="mt-2 text-lg font-semibold text-charcoal">${price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <label className="text-sm text-stone">Qty</label>
        <input
          type="number"
          value={qty}
          min={1}
          className="w-20 rounded-2xl border border-black/10 bg-ivory px-3 py-2 text-center text-sm"
          onChange={(event) => onQuantityChange(id, Number(event.target.value))}
        />
        <button onClick={() => onRemove(id)} className="rounded-full bg-stone px-4 py-2 text-sm text-white transition hover:bg-charcoal">
          Remove
        </button>
      </div>
    </div>
  );
}
