import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Помощник по подаче декларации УСН 6%',
  description: 'Интерактивный помощник для подачи декларации по УСН 6% за 2025 год',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
