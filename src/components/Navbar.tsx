'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import { Sun, Moon, Menu, X, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <header 
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        scrolled
          ? 'glass border-b shadow-lg shadow-black/5 dark:shadow-black/20'
          : 'bg-transparent border-b border-transparent'
      )}
      role="banner"
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between" role="navigation" aria-label="Main navigation">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="CodeWander - Home">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-blue-500 flex items-center justify-center shadow-md shadow-brand-500/25"
            aria-hidden="true"
          >
            <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
          </motion.div>
          <span className="font-display text-lg font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Code
            <span className="shimmer-text">Wander</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1" role="menubar">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onMouseEnter={() => setHoveredLink(link.href)}
              onMouseLeave={() => setHoveredLink(null)}
              className="relative px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400
                hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-150"
              role="menuitem"
            >
              {hoveredLink === link.href && (
                <motion.div
                  layoutId="navbar-hover"
                  className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400
              hover:text-gray-900 dark:hover:text-gray-100
              hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                aria-hidden="true"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* CTA Button */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/blog"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg
                bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium
                transition-colors duration-150 shadow-md shadow-brand-500/25
                relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" aria-hidden="true" />
              Read Blog
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={toggleMobileMenu}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            title={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                aria-hidden="true"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden glass border-t"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2.5 rounded-lg text-sm font-medium
                      text-gray-600 dark:text-gray-400
                      hover:text-gray-900 dark:hover:text-gray-100
                      hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}