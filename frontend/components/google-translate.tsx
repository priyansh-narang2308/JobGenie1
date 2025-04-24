'use client';
import { useEffect, useState, useRef } from "react";
import { Globe } from "lucide-react";

// Add type definitions for Google Translate API
declare global {
    interface Window {
        google: {
            translate: {
                TranslateElement: {
                    new(options: any, element: string): any;
                    InlineLayout: {
                        SIMPLE: string;
                    };
                };
            };
        };
        googleTranslateElementInit: () => void;
    }
}

const GoogleTranslate = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' },
        { code: 'zh-CN', name: 'Chinese' },
        { code: 'hi', name: 'Hindi' },
        { code: 'ar', name: 'Arabic' },
        { code: 'ru', name: 'Russian' },
        { code: 'ja', name: 'Japanese' },
        { code: 'ko', name: 'Korean' },
        { code: 'ta', name: 'Tamil' },
        { code: 'bn', name: 'Bengali' }
    ] as const;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        if (!document.getElementById('google-translate-script')) {
            const googleDiv = document.createElement('div');
            googleDiv.id = 'google_translate_element';
            googleDiv.style.display = 'none';
            document.body.appendChild(googleDiv);

            window.googleTranslateElementInit = function () {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: 'en',
                        includedLanguages: languages.map(lang => lang.code).join(','),
                        autoDisplay: false,
                        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
                    },
                    'google_translate_element'
                );
            };

            const script = document.createElement('script');
            script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.id = 'google-translate-script';
            script.async = true;
            document.body.appendChild(script);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const changeLanguage = (langCode: string) => {
        document.cookie = `googtrans=/auto/${langCode}`;
        document.cookie = `googtrans=/auto/${langCode};domain=.${window.location.hostname}`;
        window.location.reload();
        setShowDropdown(false);
    };

    const toggleDropdown = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowDropdown(!showDropdown);
    };

    // Improved dropdown positioning
    const getDropdownPosition = () => {
        if (!buttonRef.current) return {};

        const rect = buttonRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Default position (dropdown below button)
        let top = rect.bottom + 5;
        let left = rect.left;

        // Check if dropdown would go off the bottom of the screen
        const dropdownHeight = 300; // Approximate max height of dropdown
        if (top + dropdownHeight > viewportHeight) {
            // Position dropdown above button
            top = rect.top - dropdownHeight - 5;
        }

        // Check if dropdown would go off the right side of the screen
        const dropdownWidth = 200; // Width of dropdown
        if (left + dropdownWidth > viewportWidth) {
            // Align right edge of dropdown with right edge of button
            left = rect.right - dropdownWidth;
        }

        return {
            position: 'fixed' as const,
            top: `${Math.max(0, top)}px`,
            left: `${Math.max(0, left)}px`,
            zIndex: 9999 // Higher z-index to ensure it's above other elements
        };
    };

    return (
        <div className="google-translate-wrapper notranslate relative w-full" ref={dropdownRef}>
            <button
                ref={buttonRef}
                onClick={toggleDropdown}
                className="flex w-full items-center text-sm font-medium text-muted-foreground hover:text-foreground"
                aria-label="Select language"
            >
                <Globe className="h-4 w-4 items-center ml-2" />
            </button>

            {showDropdown && (
                <div
                    className="rounded-md border bg-white dark:bg-gray-800 shadow-lg"
                    style={{
                        ...getDropdownPosition(),
                        width: '200px'
                    }}
                >
                    <div className="max-h-[300px] overflow-y-auto py-1">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => changeLanguage(lang.code)}
                                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                {lang.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GoogleTranslate;