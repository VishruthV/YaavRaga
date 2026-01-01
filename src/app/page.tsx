'use client';

import { useState } from 'react';
import NoteSelector from '@/components/NoteSelector';
import RagaCard from '@/components/RagaCard';
import ResourceLinks from '@/components/ResourceLinks';
import styles from './page.module.css';

type RagaResponse = {
  ragaName: string;
  description: string;
  confidence: string;
  youtubeLinks: { title: string; url: string }[];
  articles: { title: string; url: string }[];
  error?: string;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RagaResponse | null>(null);

  const handleGuess = async (aroha: string[], avaroha: string[]) => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/guess-raga', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aroha, avaroha }),
      });

      const data = await response.json();

      if (data._debug) {
        console.log('--- Raga Guesser Debug Info ---');
        console.log('Model Used:', data._debug.modelUsed);
        console.log('Full Prompt:', data._debug.fullPrompt);
        console.log('Raw Response:', data._debug.rawResponse);
        console.log('-------------------------------');
      }

      setResult(data);
    } catch (error) {
      console.error('Error identifying Raga:', error);
      alert('Failed to identify Raga. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        Hindustani Raga Guesser
      </h1>
      <p className={styles.description}>
        Select the notes for Aroha (Ascending) and Avaroha (Descending) to identify the Raga.
      </p>

      <NoteSelector onGuess={handleGuess} isLoading={isLoading} />

      {result && !result.error && (
        <>
          <RagaCard
            ragaName={result.ragaName}
            description={result.description}
            confidence={result.confidence}
          />
          <ResourceLinks
            youtubeLinks={result.youtubeLinks}
            articles={result.articles}
          />
        </>
      )}
    </main>
  );
}
