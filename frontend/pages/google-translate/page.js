'use client';
import { useEffect, useState, useRef } from "react";
import { Globe } from "lucide-react";

const GoogleTranslate = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    
    // Languages for our custom dropdown
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
    ];

    useEffect(() => {
        // Handle clicks outside the dropdown to close it
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        
        // Load Google Translate only once
        if (!document.getElementById('google-translate-script')) {
            const googleDiv = document.createElement('div');
            googleDiv.id = 'google_translate_element';
            googleDiv.style.display = 'none';
            document.body.appendChild(googleDiv);

            window.googleTranslateElementInit = function() {
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

    // Simple function to change language using cookies - most reliable approach
    const changeLanguage = (langCode) => {
        // Set Google Translate cookie
        document.cookie = `googtrans=/auto/${langCode}`;
        document.cookie = `googtrans=/auto/${langCode};domain=.${window.location.hostname}`;
        
        // Reload the page - simple but effective
        window.location.reload();
        
        setShowDropdown(false);
    };

    const toggleDropdown = (e) => {
        e.stopPropagation();
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="google-translate-wrapper notranslate" ref={dropdownRef} style={{ position: 'relative' }}>
            {/* Globe icon to toggle our custom dropdown */}
            <Globe 
                size={20} 
                className="translate-icon" 
                onClick={toggleDropdown}
                style={{ cursor: 'pointer' }}
            />
            
            {/* Our custom visible dropdown */}
            {showDropdown && (
                <div className="language-dropdown notranslate" style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    backgroundColor: 'var(--background-color, white)',
                    border: '1px solid var(--border-color, #ddd)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    zIndex: 1000,
                    width: '200px',
                    maxHeight: '300px',
                    overflowY: 'auto',
                    marginTop: '5px'
                }}>
                    {languages.map((lang) => (
                        <div 
                            key={lang.code}
                            className="language-item notranslate"
                            onClick={() => changeLanguage(lang.code)}
                            style={{
                                padding: '10px 15px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                color: 'var(--text-color, #333)',
                                borderBottom: '1px solid var(--border-color, #eee)',
                                transition: 'background-color 0.2s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--hover-color, #f5f5f5)'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
                        >
                            {lang.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GoogleTranslate;