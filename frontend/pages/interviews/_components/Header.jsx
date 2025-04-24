'use client';

import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
    { label: 'Dashboard', path: '/interviews' },
    { label: 'Questions', path: '/interviews/questions' },
    { label: 'Upgrade', path: '/interviews/upgrade' },
    { label: 'How it Works', path: '/interviews/how-it-works' },
];

const Header = () => {
    const pathname = usePathname();

    return (
        <header className="w-full flex items-center justify-between px-6 py-4 shadow-md bg-white">
            <div className="flex items-center gap-2">

                <Image src="/logo.svg" alt="logo" width={120} height={60} />
            </div>

            <ul className="flex items-center gap-6 text-gray-700 font-medium">
                {navLinks.map((link) => (
                    <li
                        key={link.path}
                        className={`cursor-pointer transition ${pathname === link.path ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'
                            }`}
                    >
                        {link.label}
                    </li>
                ))}
            </ul>

            <div className="flex items-center">
                <UserButton />
            </div>
        </header>
    );
};

export default Header;
