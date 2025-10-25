'use client';

import { useRouter } from "next/navigation";
import { useForm } from "@/hooks/useForm";
import FormInput from "@/components/FormInput";

export default function RegisterPage() {
  const { form, handleChange } = useForm({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!data.error) router.push("/login");
    else alert(data.error);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleRegister} className="p-6 border rounded-lg shadow-md space-y-4 w-80">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <FormInput type="text" name="name" value={form.name} placeholder="Name" onChange={handleChange} />
        <FormInput type="email" name="email" value={form.email} placeholder="Email" onChange={handleChange} />
        <FormInput type="password" name="password" value={form.password} placeholder="Password" onChange={handleChange} />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Register
        </button>
      </form>
    </div>
  );
}
