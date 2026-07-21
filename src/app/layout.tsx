import '@/styles/globals.css'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata, Viewport } from 'next'

import Footer from '@/components/footer'
import { ThemeProvider } from '@/components/theme-provider'
import { env } from '@/env'
import { TRPCReactProvider } from '@/trpc/react'

export const metadata: Metadata = {
	description: 'See any train board in the UK as it was meant to be viewed.',
	icons: [
		{
			rel: 'icon',
			url: '/favicon.ico'
		},
		{
			rel: 'apple-touch-icon',
			url: '/apple-touch-icon.png'
		},
		{
			rel: 'android-chrome-192x192',
			url: '/android-chrome-192x192.png'
		},
		{
			rel: 'android-chrome-512x512',
			url: '/android-chrome-512x512.png'
		},
		{
			rel: 'favicon-16x16',
			url: '/favicon-16x16.png'
		},
		{
			rel: 'favicon-32x32',
			url: '/favicon-32x32.png'
		}
	],
	manifest: '/site.webmanifest',
	metadataBase:
		env.NODE_ENV === 'production'
			? new URL('https://trains.cargill.dev')
			: new URL('http://localhost:3000'),
	openGraph: {
		description: 'See any train board in the UK as it was meant to be viewed.',
		images: [
			{
				alt: 'Trains!',
				height: 630,
				url: '/opengraph-image.png',
				width: 1200
			}
		],
		title: 'Trains!'
	},
	title: 'Trains!'
}

export const viewport: Viewport = {
	initialScale: 1,
	themeColor: '#020817',
	width: 'device-width'
}

export default function RootLayout({
	children
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={`${GeistSans.variable} ${GeistMono.variable} min-h-screen bg-background font-sans text-foreground`}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<TRPCReactProvider>{children}</TRPCReactProvider>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	)
}
