import Link from 'next/link'

import Counter from './counter'
import ThemeToggle from './theme-toggle'

export default function Footer() {
  return (
    <footer className="flex h-16 w-full text-muted-foreground">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4">
        <Counter />

        <ThemeToggle />
        <div className="flex items-center gap-4">
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

          <p className="text-sm">&copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}
