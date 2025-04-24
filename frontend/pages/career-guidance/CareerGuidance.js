//CareeGuidance.js
'use client';

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Mic, Search, MessageSquare, TrendingUp, Route } from "lucide-react";
import styles from "./CareerGuidance.module.css";
import CareerPathVisualizer from './CareerPathVisualizer';
import IndustryInsightsDashboard from './IndustryInsightsDashboard';
import CareerChatbot from './CareerChatbot';

const CareerGuidance = () => {
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [activeTab, setActiveTab] = useState("coach");

    useEffect(() => {
        setIsClient(true);
        const savedQuery = localStorage.getItem("aiCoachQuery");
        const savedResponse = localStorage.getItem("aiCoachResponse");
        const savedTab = localStorage.getItem("activeTab");

        if (savedQuery) setQuery(savedQuery);
        if (savedResponse) setResponse(savedResponse);
        if (savedTab) setActiveTab(savedTab);
    }, []);

    useEffect(() => {
        if (isClient) {
            localStorage.setItem("aiCoachQuery", query);
        }
    }, [query, isClient]);

    useEffect(() => {
        if (isClient) {
            localStorage.setItem("aiCoachResponse", response);
        }
    }, [response, isClient]);

    useEffect(() => {
        if (isClient) {
            localStorage.setItem("activeTab", activeTab);
        }
    }, [activeTab, isClient]);

    const handleQueryWithText = async (inputText) => {
        if (!inputText.trim()) return;

        setLoading(true);
        try {
            const res = await fetch("http://localhost:8000/api/career-guidance", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: inputText }),
            });

            const data = await res.json();
            if (data.error) {
                setResponse(data.error);
            } else {
                setResponse(data.response || "No response.");
            }
        } catch (err) {
            setResponse("Error connecting to backend.");
        }
        setLoading(false);
    };

    const handleQuery = () => {
        handleQueryWithText(query);
    };

    const handleVoiceInput = () => {
        if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
            const recognition = new window.webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = "en-US";

            recognition.start();
            setIsListening(true);

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setQuery(transcript);
                handleQueryWithText(transcript);
                setIsListening(false);
            };

            recognition.onerror = () => setIsListening(false);
            recognition.onend = () => setIsListening(false);
        } else {
            alert("Speech Recognition is not supported in this browser.");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleQuery();
        }
    };

    const clearAICoach = () => {
        setQuery("");
        setResponse("");
        localStorage.removeItem("aiCoachQuery");
        localStorage.removeItem("aiCoachResponse");
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>JobGenie - Career Guidance</h1>
                <p className={styles.subtitle}>Get personalized career advice, skill development recommendations, and industry insights.</p>
            </div>

            <div className={styles.tabNavigation}>
                <button
                    className={`${styles.tabButton} ${activeTab === "coach" ? styles.tabButtonActive : ""}`}
                    onClick={() => setActiveTab("coach")}
                >
                    <MessageSquare size={16} />
                    <span>Career Coach</span>
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === "pathVisualizer" ? styles.tabButtonActive : ""}`}
                    onClick={() => setActiveTab("pathVisualizer")}
                >
                    <Route size={16} />
                    <span>Career Paths</span>
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === "industryInsights" ? styles.tabButtonActive : ""}`}
                    onClick={() => setActiveTab("industryInsights")}
                >
                    <TrendingUp size={16} />
                    <span>Industry Insights</span>
                </button>
            </div>

            <div className={styles.content}>
                {activeTab === "coach" && (
                    <>
                        <div className={styles.featuresGrid}>
                            <div className={styles.featureCard}>
                                <div className={styles.featureIcon}>
                                    <MessageSquare size={24} />
                                </div>
                                <h3 className={styles.featureTitle}>Personal Career Advice</h3>
                                <p className={styles.featureDescription}>Get tailored guidance for your specific career questions and challenges</p>
                            </div>
                            <div className={styles.featureCard}>
                                <div className={styles.featureIcon}>
                                    <Search size={24} />
                                </div>
                                <h3 className={styles.featureTitle}>Skill Development</h3>
                                <p className={styles.featureDescription}>Learn which skills to develop based on your career goals and industry trends</p>
                            </div>
                        </div>

                        <hr />
                        <br />

                        <div className={styles.chatCard}>
                            <div className={styles.chatHeader}>
                                <h2 className={styles.chatHeaderTitle}>AI Career Coach</h2>
                                <button
                                    onClick={clearAICoach}
                                    className={styles.clearButton}
                                    title="Clear conversation"
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'hsl(var(--foreground))',
                                        cursor: 'pointer',
                                        opacity: 0.8,
                                        padding: '4px 8px',
                                        fontSize: '14px'
                                    }}
                                >
                                    Clear
                                </button>
                            </div>

                            <div className={styles.chatInputArea}>
                                <textarea
                                    className={styles.inputBox}
                                    placeholder="Ask a career-related question..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    rows={3}
                                />

                                <div className={styles.inputControls}>
                                    <button className={styles.askButton} onClick={handleQuery} disabled={loading}>
                                        {loading ? "Processing..." : "Get assistance"}
                                    </button>

                                    <button
                                        className={`${styles.micButton} ${isListening ? styles.micButtonListening : ""}`}
                                        onClick={handleVoiceInput}
                                        title="Speak your query"
                                    >
                                        <Mic size={18} />
                                    </button>
                                </div>
                            </div>

                            {response && (
                                <div className={styles.responseContainer}>
                                    <div className={styles.responseHeader}>
                                        <h3 className={styles.responseTitle}>Response:</h3>
                                    </div>
                                    <div className={styles.responseContent}>
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {response}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className={styles.trustIndicator}>
                            <div className={styles.userIcon}>👥</div>
                            <p>Trusted by 500K+ job seekers worldwide</p>
                        </div>
                    </>
                )}

                {activeTab === "pathVisualizer" && (
                    <div className={styles.tabContent}>
                        <CareerPathVisualizer />
                    </div>
                )}

                {activeTab === "industryInsights" && (
                    <div className={styles.tabContent}>
                        <IndustryInsightsDashboard />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CareerGuidance;
