import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="pt-16 min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <p className="text-8xl font-bold text-gray-100 dark:text-gray-800 font-mono">404</p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-2 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          Page not found
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 max-w-xs mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-medium text-sm transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
