import { createClient } from '@/lib/supabase/server';
import ListingCard from '@/components/ListingCard';

export const dynamic = 'force-dynamic';

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const supabase = createClient();

  let query = supabase
    .from('listings')
    .select('id, title, category, price, currency, location, cover_photo_url, specs')
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (searchParams.category) {
    query = query.eq('category', searchParams.category);
  }

  const { data: listings, error } = await query;

  if (error) {
    return <p className="text-red-600">Could not load listings: {error.message}</p>;
  }

  return (
    <div>
      <div className="mb-6 flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold">Browse Equipment</h1>
        <p className="text-sm text-neutral-500">
          {listings?.length ?? 0} {listings?.length === 1 ? 'result' : 'results'}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(listings ?? []).map((listing) => (
          <ListingCard key={listing.id} listing={listing as any} />
        ))}
      </div>
      {listings?.length === 0 && (
        <p className="mt-12 text-center text-neutral-500">No listings match this filter yet.</p>
      )}
    </div>
  );
}