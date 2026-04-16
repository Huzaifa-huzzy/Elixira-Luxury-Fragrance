'use client';

import { useState } from 'react';

export interface DropdownOption {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  label?: string;
  value: string;
  placeholder: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  allowClear?: boolean;
}

export function CustomDropdown({
  label,
  value,
  placeholder,
  options,
  onChange,
  allowClear = true,
}: CustomDropdownProps) {
  const [open, setOpen] = useState(false);
  const selectedLabel =
    options.find((option) => option.value === value)?.label || placeholder;

  return (
    <div className="space-y-1">
      {label && (
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone">
          {label}
        </p>
      )}
      <div
        className="relative"
        tabIndex={0}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
      >
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="flex w-full items-center justify-between rounded-2xl border border-black/10 bg-ivory px-4 py-3 text-left text-sm text-charcoal outline-none transition focus:border-charcoal"
        >
          <span>{selectedLabel}</span>
          <span
            className={`text-xs text-stone transition ${open ? 'rotate-180' : ''}`}
          >
            v
          </span>
        </button>

        {open && (
          <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl">
            <ul className="max-h-56 overflow-y-auto py-1">
              {allowClear && (
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      onChange('');
                      setOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm transition ${
                      value === ''
                        ? 'bg-charcoal text-ivory'
                        : 'text-charcoal hover:bg-ivory'
                    }`}
                  >
                    {placeholder}
                  </button>
                </li>
              )}
              {options.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm transition ${
                      value === option.value
                        ? 'bg-charcoal text-ivory'
                        : 'text-charcoal hover:bg-ivory'
                    }`}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
