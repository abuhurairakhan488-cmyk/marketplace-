import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import ThreadComposer from '@/components/ThreadComposer';

export const dynamic = 'force-dynamic';

export default async function ThreadPage({ params }: { params: { inquiryId: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: inquiry } = await supabase
    .from('inquiries')
    .select('id, message, created_at, listing_id, buyer_id, listings(title)')
    .eq('id', params.inquiryId)
    .single();

  const { data: messages } = await supabase
    .from('messages')
    .select('id, sender_id, body, created_at')
    .eq('inquiry_id', params.inquiryId)
    .order('created_at', { ascending: true });

  if (!inquiry) redirect('/messages');

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-xl font-semibold">{(inquiry as any).listings?.title ?? 'Conversation'}</h1>

      <div className="space-y-3 rounded-lg border border-neutral-200 bg-white p-4">
        <div className="rounded-md bg-neutral-100 p-3 text-sm">
          <p>{inquiry.message}</p>
          <p className="mt-1 text-xs text-neutral-400">
            {new Date(inquiry.created_at).toLocaleString()}
          </p>
        </div>
        {(messages ?? []).map((m) => (
          <div
            key={m.id}
            className={`max-w-[80%] rounded-md p-3 text-sm ${
              m.sender_id === user.id
                ? 'ml-auto bg-neutral-900 text-white'
                : 'bg-neutral-100 text-neutral-900'
            }`}
          >
            <p>{m.body}</p>
            <p
              className={`mt-1 text-xs ${
                m.sender_id === user.id ? 'text-neutral-300' : 'text-neutral-400'
              }`}
            >
              {new Date(m.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <ThreadComposer inquiryId={inquiry.id} currentUserId={user.id} />
    </div>
  );
}