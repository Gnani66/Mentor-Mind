"use client";

import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({ label, error, id, ...props }: InputProps) {
  return (
    <div className="input-group">
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <input id={id} className={`input-field ${error ? "input-error" : ""}`} {...props} />
      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
}