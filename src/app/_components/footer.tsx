import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="flex h-16 w-full bg-gray-900 text-gray-500">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-2">
        <p className="text-sm">&copy; {new Date().getFullYear()}</p>
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
