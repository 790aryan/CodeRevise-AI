import { useState } from 'react';
import { registerUser } from '@/services/auth.service.js';
import { useNavigate } from 'react-router-dom';

export function RegisterPage() {
    const navigate = useNavigate();
   const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    });

    function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
        ...previous,
        [name]: value,
    }));
    }

    async function handleSubmit(event) {
    event.preventDefault();

    try {
        const response = await registerUser(formData);

        console.log('Register Success:', response);

        navigate('/login');
    } catch (error) {
        console.error('Register Error:', error.response?.data || error);
    }
    }

  return (
    <section className="mx-auto flex min-h-screen max-w-md items-center px-6">
      <div className="w-full rounded-lg border border-white/10 bg-surface p-6 shadow-soft">
        <h1 className="text-3xl font-semibold">
          Create Account
        </h1>

        <p className="mt-2 text-text-muted">
          Create your CodeRevise AI account.
        </p>

        <form
        className="mt-6 space-y-4"
        onSubmit={handleSubmit}
        >
            <div>
            <label className="mb-2 block text-sm">
                Name
            </label>

            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full rounded-lg border border-white/10 bg-transparent px-4 py-3"
            />
            </div>
          <div>
            <label className="mb-2 block text-sm">
              Email
            </label>

            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-white/10 bg-transparent px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">
              Password
            </label>

            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full rounded-lg border border-white/10 bg-transparent px-4 py-3"
                />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-accent px-4 py-3 font-medium"
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
}