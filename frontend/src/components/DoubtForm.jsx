import { useState } from 'react';
import toast from 'react-hot-toast';
import api, { parseErrorMessage } from '../services/api.js';
import LoadingSpinner from './LoadingSpinner.jsx';

const roles = [
  { value: 'student', label: 'Student' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'admin', label: 'Admin' },
];

const DoubtForm = () => {
  const [formData, setFormData] = useState({ name: '', role: 'student', message: '' });
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.message) {
      toast.error('Please tell us who you are and what you are struggling with.');
      return;
    }

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('role', formData.role);
    payload.append('message', formData.message);
    if (image) {
      payload.append('image', image);
    }

    setIsSubmitting(true);
    try {
      const response = await api.post('/api/doubt', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success(response.data.detail);
      setFormData({ name: '', role: 'student', message: '' });
      setImage(null);
    } catch (error) {
      toast.error(parseErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return <LoadingSpinner label="Sharing with mentors" />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="text-sm font-semibold text-white/80">
          Name
        </label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="How should we call you?"
          className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-primary focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="role" className="text-sm font-semibold text-white/80">
          Your Role
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-primary focus:outline-none"
        >
          {roles.map((role) => (
            <option key={role.value} value={role.value} className="bg-midnight-soft text-white">
              {role.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-semibold text-white/80">
          Share your doubt
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder="Give us the context, what you tried, and where it broke."
          className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-primary focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="image" className="text-sm font-semibold text-white/80">
          Optional screenshot or photo
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={(event) => setImage(event.target.files?.[0] ?? null)}
          className="mt-2 w-full rounded-2xl border border-dashed border-white/20 bg-white/5 px-4 py-3 text-sm text-white/70 file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-900"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-primary px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-primary-light"
      >
        Share with Mentors
      </button>
    </form>
  );
};

export default DoubtForm;
