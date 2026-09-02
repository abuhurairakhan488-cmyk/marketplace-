import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: listings } = await supabase
    .from('listings')
    .select('id, title, status, price, currency')
    .eq('seller_id', user.id)
    .order('created_at', { ascending: false });

  const { count: unreadCount } = await supabase
    .from('messages')
    .select('id', { count: 'exact', head: true })
    .is('read_at', null)
    .neq('sender_id', user.id);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your Dashboard</h1>
        <Link href="/messages" className="text-sm text-neutral-600 hover:underline">
          Messages{unreadCount ? ` (${unreadCount} unread)` : ''}
        </Link>
      </div>

      <h2 className="mb-3 font-medium">Your Listings</h2>
      <div className="divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
        {(listings ?? []).map((l) => (
          <div key={l.id} className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="font-medium">{l.title}</p>
              <p className="text-xs uppercase text-neutral-400">{l.status}</p>
            </div>
            <p className="text-sm">
              {l.currency} {Number(l.price).toLocaleString()}
            </p>
          </div>
        ))}
        {(!listings || listings.length === 0) && (
          <p className="px-4 py-6 text-sm text-neutral-500">
            You haven't listed anything yet.{' '}
            <Link href="/sell" className="underline">
              List equipment
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}