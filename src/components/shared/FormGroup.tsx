import React from 'react';

import styles from './FormGroup.module.css';

export type FormGroupProps = {
  label: string;
  type?: 'text' | 'email' | 'password';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
  htmlFor?: string;
  id?: string;
  name?: string;
};

export default function FormGroup({
  label,
  type = 'text',
  id,
  name,
  value = '',
  onChange,
  required = false,
  placeholder = ''
}: FormGroupProps) {
  return (
    <div className={styles.formGroup}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
}
