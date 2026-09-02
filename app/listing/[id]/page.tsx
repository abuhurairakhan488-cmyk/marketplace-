import { createClient } from '@/lib/supabase/server';
import { getSpecFields, formatSpecValue } from '@/lib/specs';
import ContactSellerButton from '@/components/ContactSellerButton';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ListingDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data: listing } = await supabase
    .from('listings')
    .select('*, listing_photos(url, sort_order)')
    .eq('id', params.id)
    .single();

  if (!listing) notFound();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const fields = getSpecFields(listing.category);
  const photos = (listing.listing_photos ?? []).sort(
    (a: any, b: any) => a.sort_order - b.sort_order
  );

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="aspect-[4/3] overflow-hidden rounded-lg bg-neutral-100">
          {photos[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photos[0].url} alt={listing.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-neutral-400">No photo</div>
          )}
        </div>
        {photos.length > 1 && (
          <div className="mt-2 grid grid-cols-4 gap-2">
            {photos.slice(1).map((p: any) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={p.url} src={p.url} alt="" className="aspect-square rounded object-cover" />
            ))}
          </div>
        )}

        <h1 className="mt-6 text-2xl font-semibold">{listing.title}</h1>
        <p className="text-neutral-500">{listing.location}</p>

        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-neutral-200 pt-6 sm:grid-cols-3">
          {fields.map((f) => (
            <div key={f.key}>
              <dt className="text-xs uppercase text-neutral-400">{f.label}</dt>
              <dd className="mt-1 font-medium">{formatSpecValue(f, listing.specs?.[f.key])}</dd>
            </div>
          ))}
        </dl>

        {listing.description && (
          <div className="mt-6 border-t border-neutral-200 pt-6">
            <h2 className="font-medium">Description</h2>
            <p className="mt-2 whitespace-pre-wrap text-neutral-700">{listing.description}</p>
          </div>
        )}
      </div>

      <div className="rounded-lg border border-neutral-200 p-6">
        <p className="text-2xl font-semibold">
          {listing.currency} {Number(listing.price).toLocaleString()}
        </p>
        <div className="mt-4">
          <ContactSellerButton
            listingId={listing.id}
            sellerId={listing.seller_id}
            currentUserId={user?.id ?? null}
          />
        </div>
      </div>
    </div>
  );
}