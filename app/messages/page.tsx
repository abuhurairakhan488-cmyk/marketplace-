import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function MessagesInboxPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: inquiries } = await supabase
    .from('inquiries')
    .select('id, message, status, last_message_at, listing_id, buyer_id, listings(title, seller_id)')
    .or(`buyer_id.eq.${user.id},listings.seller_id.eq.${user.id}`)
    .order('last_message_at', { ascending: false });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Messages</h1>
      <div className="divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
        {(inquiries ?? []).map((i: any) => (
          <Link
            key={i.id}
            href={`/messages/${i.id}`}
            className="block px-4 py-3 hover:bg-neutral-50"
          >
            <div className="flex items-center justify-between">
              <p className="font-medium">{i.listings?.title ?? 'Listing'}</p>
              <span className="text-xs text-neutral-400">
                {new Date(i.last_message_at).toLocaleDateString()}
              </span>
            </div>
            <p className="mt-1 truncate text-sm text-neutral-500">{i.message}</p>
          </Link>
        ))}
        {(!inquiries || inquiries.length === 0) && (
          <p className="px-4 py-6 text-sm text-neutral-500">No conversations yet.</p>
        )}
      </div>
    </div>
  );
}