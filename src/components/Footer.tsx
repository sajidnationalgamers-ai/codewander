import Link from 'next/link';
import { Zap, Github, Twitter, Rss } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-brand-400 to-blue-500 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                Code<span className="text-brand-500">Wander</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
              Deep dives and practical tutorials for developers who ship. No fluff, just code.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="/rss" className="p-2 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Rss className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Content</h3>
            <ul className="space-y-2">
              {['Blog', 'AI', 'Web Dev', 'Cybersecurity', 'DevOps'].map(item => (
                <li key={item}>
                  <Link href={`/blog?category=${item}`}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Site</h3>
            <ul className="space-y-2">
              {[
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'About', href: '/about' },
                
                { label: 'Newsletter', href: '/newsletter' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-400">
            © 2026 CodeWander. Built with Next.js & Tailwind CSS.
          </p>
          <p className="text-xs text-gray-400">
            Made with ❤️ for developers
          </p>
        </div>
      </div>
    </footer>
  );
}
