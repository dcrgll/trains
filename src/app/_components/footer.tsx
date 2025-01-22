import Link from 'next/link'

import ThemeToggle from './theme-toggle'

export default function Footer() {
  return (
    <footer className="text-muted-foreground flex h-16 w-full">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-2">
        <p className="text-sm">&copy; {new Date().getFullYear()}</p>
        <ThemeToggle />
        <p className="text-sm">
          Built by{' '}
          <Link
            href="https://cargill.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Dan Cargill
          </Link>
        </p>
      </div>
    </footer>
  )
}
