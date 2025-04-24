// layout.js (No 'use client' here)
import '../styles/globals.css'
import CareerChatbotWrapper from './CareerChatbotWrapper';

export const metadata = {
    title: 'JobGenie - Career Guidance',
    description: 'Get personalized career advice and guidance',
    icons: {
        icon: '/favicon.ico',
    },
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {children}
                <CareerChatbotWrapper />
            </body>
        </html>
    )
}
