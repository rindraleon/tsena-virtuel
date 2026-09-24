import { useTitle } from '../../hooks';
import { useState, type FormEvent } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Save, Camera } from 'lucide-react';
import Button from '../../components/common/Button';

export default function ClientProfilePage() {
  useTitle('Mon profil | Client');
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-primary mb-6">My Profile</h2>

      {/* Avatar */}
      <div className="bg-surface rounded-xl border border-border p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-text">{user?.name}</h3>
            <p className="text-sm text-muted capitalize">{user?.role} Account</p>
            <button className="mt-2 inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline">
              <Camera size={14} /> Change Photo
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-surface rounded-xl border border-border p-6 space-y-4">
        <h3 className="font-semibold text-text mb-2">Personal Information</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text mb-1">Full Name</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text mb-1">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-text mb-1">Phone</label>
            <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
          </div>
        </div>

        {saved && <p className="text-success text-sm">✓ Profile updated successfully!</p>}

        <div className="flex justify-end pt-2">
          <Button type="submit" icon={Save} variant="primary">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
