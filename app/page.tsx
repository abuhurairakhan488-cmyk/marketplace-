import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-4xl font-semibold">Buy and sell heavy equipment, worldwide.</h1>
      <p className="mx-auto mt-4 max-w-xl text-neutral-600">
        Excavators, wheel loaders, cranes and more — verified specs, real photos, direct contact
        with sellers.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link
          href="/browse"
          className="rounded-md bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-700"
        >
          Browse Equipment
        </Link>
        <Link
          href="/sell"
          className="rounded-md border border-neutral-300 px-6 py-3 text-sm font-medium hover:bg-neutral-50"
        >
          Sell Equipment
        </Link>
      </div>
    </div>
  );
}