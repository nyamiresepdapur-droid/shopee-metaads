import './globals.css'

export const metadata = {
  title: 'Berkah Affiliate Hub',
  description: 'Sistem Manajemen Agency Ads',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
