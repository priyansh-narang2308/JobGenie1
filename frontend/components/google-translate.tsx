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

    return (
        <div className="google-translate-wrapper notranslate relative w-full" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="flex w-full items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
            <Globe className="h-4 w-4 items-center ml-2" />
            </button>

            {showDropdown && (
                <div className="absolute left-0 top-full z-50 mt-2 w-48 rounded-md border bg-background shadow-lg">
                    <div className="max-h-[300px] overflow-y-auto py-1">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => changeLanguage(lang.code)}
                                className="flex w-full items-center px-4 py-2 text-sm text-foreground hover:bg-muted"
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