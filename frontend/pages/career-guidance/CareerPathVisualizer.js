'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import styles from './CareerPathVisualizer.module.css';

const CareerPathVisualizer = () => {
    const [selectedPath, setSelectedPath] = useState(null);
    const [expandedNodes, setExpandedNodes] = useState([]);
    const [careerInput, setCareerInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!careerInput.trim()) return;

        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8000/api/career-path', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ career: careerInput }),
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
                setSelectedPath(null);
                return;
            }

            if (!data.skills || !Array.isArray(data.skills) || !data.nodes || !Array.isArray(data.nodes)) {
                setError('Invalid career path data received');
                setSelectedPath(null);
                return;
            }

            setSelectedPath(data);
            setError(null);
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to fetch career path data. Please try again.');
            setSelectedPath(null);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleNodeExpansion = (nodeId) => {
        setExpandedNodes(prev =>
            prev.includes(nodeId)
                ? prev.filter(id => id !== nodeId)
                : [...prev, nodeId]
        );
    };

    const getProgressPercentage = (timeframe) => {
        const years = parseInt(timeframe.split('-')[1] || timeframe.split('+')[0]);
        return Math.min((years / 5) * 100, 100);
    };

    return (
        <div className={styles.careerPathVisualizer}>
            <div className={styles.visualizerHeader}>
                <h2>Career Path Explorer</h2>
                <p>Enter any career to view detailed progression stages and requirements</p>

                <div className={styles.careerSearch}>
                    <div className={styles.searchInputContainer}>
                        <input
                            type="text"
                            value={careerInput}
                            onChange={(e) => setCareerInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            placeholder="Enter a career (e.g., Software Developer, Data Scientist)"
                            className={styles.careerSearchInput}
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSearch}
                            className={styles.searchButton}
                            disabled={isLoading || !careerInput.trim()}
                        >
                            {isLoading ? 'Loading...' : <Search size={20} />}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className={styles.error}>
                        {error}
                    </div>
                )}
            </div>

            {isLoading && (
                <div className={styles.loadingSection}>
                    <div className={styles.spinner}></div>
                    <p>Generating career path...</p>
                </div>
            )}

            {selectedPath && !isLoading && (
                <div className={styles.pathDetails}>
                    <div className={styles.pathSkills}>
                        <h3>Core Skills Required:</h3>
                        <div className={styles.skillTags}>
                            {selectedPath.skills.map((skill, index) => (
                                <span key={index} className={styles.skillTag}>{skill}</span>
                            ))}
                        </div>
                    </div>

                    <div className={styles.pathTimeline}>
                        {selectedPath.nodes.map((node, index, array) => (
                            <div key={node.id} className={styles.timelineNode}>
                                <div className={styles.nodeHeader} onClick={() => toggleNodeExpansion(node.id)}>
                                    <div className={styles.nodeTitle}>
                                        <h4>{node.title}</h4>
                                        <span className={styles.timeframe}>{node.timeframe}</span>
                                    </div>
                                </div>

                                {expandedNodes.includes(node.id) && (
                                    <div className={styles.nodeContent}>
                                        <p>{node.details}</p>
                                        <div className={styles.requirementsList}>
                                            <h5>Key Requirements:</h5>
                                            <ul>
                                                {node.requirements.map((req, i) => (
                                                    <li key={i}>{req}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className={styles.progressIndicator}>
                                            <div className={styles.progressBar}>
                                                <div
                                                    className={styles.progressFill}
                                                    style={{ width: `${getProgressPercentage(node.timeframe)}%` }}
                                                />
                                            </div>
                                            <span>{node.timeframe}</span>
                                        </div>
                                    </div>
                                )}

                                {index < array.length - 1 && <div className={styles.timelineConnector} />}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CareerPathVisualizer;
