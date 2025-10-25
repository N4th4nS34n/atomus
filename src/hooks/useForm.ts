import { useState } from "react";

export function useForm<T extends Record<string, any>>(initialValues: T) {
  const [form, setForm] = useState(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return { form, handleChange, setForm };
}
