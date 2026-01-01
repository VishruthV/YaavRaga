'use client';

import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import styles from './NoteSelector.module.css';

export type Note = {
    id: string;
    swara: string;
    western: string;
    isBlack: boolean;
    octave: 'mandra' | 'madhya' | 'taar';
    frequency?: string;
};

// Define notes from Mandra Pa (G3) to Taar Pa (G5)
// Assuming C4 is Madhya Sa
const ALL_NOTES: Note[] = [
    // Mandra Saptak (Lower Octave)
    { id: 'm_P', swara: 'Pa', western: 'G3', isBlack: false, octave: 'mandra' },
    { id: 'm_d', swara: 'dha', western: 'G#3', isBlack: true, octave: 'mandra' },
    { id: 'm_D', swara: 'Dha', western: 'A3', isBlack: false, octave: 'mandra' },
    { id: 'm_n', swara: 'ni', western: 'A#3', isBlack: true, octave: 'mandra' },
    { id: 'm_N', swara: 'Ni', western: 'B3', isBlack: false, octave: 'mandra' },

    // Madhya Saptak (Middle Octave)
    { id: 'S', swara: 'Sa', western: 'C4', isBlack: false, octave: 'madhya' },
    { id: 'r', swara: 're', western: 'C#4', isBlack: true, octave: 'madhya' },
    { id: 'R', swara: 'Re', western: 'D4', isBlack: false, octave: 'madhya' },
    { id: 'g', swara: 'ga', western: 'D#4', isBlack: true, octave: 'madhya' },
    { id: 'G', swara: 'Ga', western: 'E4', isBlack: false, octave: 'madhya' },
    { id: 'm', swara: 'ma', western: 'F4', isBlack: false, octave: 'madhya' },
    { id: 'M', swara: 'Ma', western: 'F#4', isBlack: true, octave: 'madhya' },
    { id: 'P', swara: 'Pa', western: 'G4', isBlack: false, octave: 'madhya' },
    { id: 'd', swara: 'dha', western: 'G#4', isBlack: true, octave: 'madhya' },
    { id: 'D', swara: 'Dha', western: 'A4', isBlack: false, octave: 'madhya' },
    { id: 'n', swara: 'ni', western: 'A#4', isBlack: true, octave: 'madhya' },
    { id: 'N', swara: 'Ni', western: 'B4', isBlack: false, octave: 'madhya' },

    // Taar Saptak (Higher Octave)
    { id: 't_S', swara: 'Sa', western: 'C5', isBlack: false, octave: 'taar' },
    { id: 't_r', swara: 're', western: 'C#5', isBlack: true, octave: 'taar' },
    { id: 't_R', swara: 'Re', western: 'D5', isBlack: false, octave: 'taar' },
    { id: 't_g', swara: 'ga', western: 'D#5', isBlack: true, octave: 'taar' },
    { id: 't_G', swara: 'Ga', western: 'E5', isBlack: false, octave: 'taar' },
    { id: 't_m', swara: 'ma', western: 'F5', isBlack: false, octave: 'taar' },
    { id: 't_M', swara: 'Ma', western: 'F#5', isBlack: true, octave: 'taar' },
    { id: 't_P', swara: 'Pa', western: 'G5', isBlack: false, octave: 'taar' },
];

interface NoteSelectorProps {
    onGuess: (aroha: string[], avaroha: string[]) => void;
    isLoading: boolean;
}

export default function NoteSelector({ onGuess, isLoading }: NoteSelectorProps) {
    const [mode, setMode] = useState<'aroha' | 'avaroha'>('aroha');
    const [aroha, setAroha] = useState<string[]>([]);
    const [avaroha, setAvaroha] = useState<string[]>([]);
    const samplerRef = useRef<Tone.Sampler | null>(null);
    const [isAudioReady, setIsAudioReady] = useState(false);

    useEffect(() => {
        // Initialize Tone.js Sampler with Harmonium samples
        // We exclude G5.ogg as it appears to be corrupt (14 bytes)
        const sampler = new Tone.Sampler({
            urls: {
                "C3": "C3.ogg",
                "G3": "G3.ogg",
                "C4": "C4.ogg",
                "G4": "G4.ogg",
                "C5": "C5.ogg",
            },
            release: 1,
            baseUrl: "/samples/harmonium/",
            onload: () => {
                setIsAudioReady(true);
                console.log("Harmonium samples loaded successfully");
            },
            onerror: (err) => {
                console.error("Failed to load samples, falling back to synth", err);
            }
        }).toDestination();

        samplerRef.current = sampler;

        return () => {
            sampler.dispose();
        };
    }, []);

    const playNote = async (note: Note) => {
        await Tone.start();

        if (isAudioReady && samplerRef.current) {
            samplerRef.current.triggerAttackRelease(note.western, 1);
        } else {
            // Fallback synth if samples aren't ready
            const synth = new Tone.Synth().toDestination();
            synth.triggerAttackRelease(note.western, "8n");
        }
    };

    const currentNotes = mode === 'aroha' ? aroha : avaroha;
    const setNotes = mode === 'aroha' ? setAroha : setAvaroha;

    const toggleNote = (noteId: string) => {
        const note = ALL_NOTES.find(n => n.id === noteId);
        if (note) playNote(note);

        if (currentNotes.includes(noteId)) {
            setNotes(currentNotes.filter((id) => id !== noteId));
        } else {
            // Sort notes based on their index in ALL_NOTES array
            const newNotes = [...currentNotes, noteId].sort((a, b) => {
                const indexA = ALL_NOTES.findIndex((n) => n.id === a);
                const indexB = ALL_NOTES.findIndex((n) => n.id === b);
                // If mode is avaroha, sort descending (High to Low)
                if (mode === 'avaroha') {
                    return indexB - indexA;
                }
                // If mode is aroha, sort ascending (Low to High)
                return indexA - indexB;
            });
            setNotes(newNotes);
        }
    };

    const handleGuess = () => {
        onGuess(aroha, avaroha);
    };

    const renderOctave = (octave: 'mandra' | 'madhya' | 'taar', label: string) => (
        <div className={styles.octaveContainer}>
            <div className={styles.octaveLabel}>{label}</div>
            <div className={styles.keyboard}>
                {ALL_NOTES.filter(n => n.octave === octave).map((note) => (
                    <button
                        key={note.id}
                        className={`${styles.key} ${note.isBlack ? styles.black : ''} ${currentNotes.includes(note.id) ? styles.selected : ''
                            }`}
                        onClick={() => toggleNote(note.id)}
                    >
                        <span className={styles.swaraLabel}>
                            {note.swara}
                            {octave === 'mandra' && <span className={styles.dot}>.</span>}
                            {octave === 'taar' && <span className={styles.dotTop}>.</span>}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className={styles.container}>
            <div className={styles.toggleContainer}>
                <button
                    className={`${styles.toggleButton} ${mode === 'aroha' ? styles.active : ''}`}
                    onClick={() => setMode('aroha')}
                >
                    Aroha (Ascending)
                </button>
                <button
                    className={`${styles.toggleButton} ${mode === 'avaroha' ? styles.active : ''}`}
                    onClick={() => setMode('avaroha')}
                >
                    Avaroha (Descending)
                </button>
            </div>

            <div className={styles.selectedNotes}>
                {currentNotes.length === 0 && (
                    <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                        Select notes for {mode}...
                    </span>
                )}
                {currentNotes.map((noteId) => {
                    const note = ALL_NOTES.find((n) => n.id === noteId);
                    return (
                        <span key={noteId} className={styles.noteBadge}>
                            {note?.swara}
                            {note?.octave === 'mandra' && '̣'}
                            {note?.octave === 'taar' && '̇'}
                        </span>
                    );
                })}
            </div>

            <div className={styles.fullKeyboard}>
                {renderOctave('mandra', 'Mandra (Lower)')}
                {renderOctave('madhya', 'Madhya (Middle)')}
                {renderOctave('taar', 'Taar (Higher)')}
            </div>

            <div className={styles.actionButtons}>
                <button
                    className={styles.clearButton}
                    onClick={() => setNotes([])}
                    disabled={currentNotes.length === 0}
                >
                    Clear {mode === 'aroha' ? 'Aroha' : 'Avaroha'}
                </button>
                <button
                    className={styles.submitButton}
                    onClick={handleGuess}
                    disabled={aroha.length === 0 || avaroha.length === 0 || isLoading}
                >
                    {isLoading ? 'Identifying...' : 'Identify Raga'}
                </button>
            </div>
        </div>
    );
}
