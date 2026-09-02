'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function SellPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('excavator');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleCreateDraft() {
    setLoading(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push('/login');
      return;
    }

    // Always insert as draft — photos are required before a listing can go active.
    const { data, error: insertErr } = await supabase
      .from('listings')
      .insert({
        seller_id: user.id,
        title,
        category,
        price: Number(price) || 0,
        currency: 'USD',
        location,
        status: 'draft',
        specs: {},
      })
      .select('id')
      .single();

    setLoading(false);

    if (insertErr) {
      setError(insertErr.message);
      return;
    }

    router.push(`/sell/${data.id}/photos`);
  }

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 text-2xl font-semibold">List Your Equipment</h1>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          >
            <option value="excavator">Excavator</option>
            <option value="wheel_loader">Wheel Loader</option>
            <option value="crane">Crane</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Price (USD)</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          onClick={handleCreateDraft}
          disabled={loading || !title || !price}
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-50"
        >
          {loading ? 'Creating…' : 'Continue to Photos'}
        </button>
      </div>
    </div>
  );
}