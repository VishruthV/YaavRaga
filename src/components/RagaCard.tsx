import styles from './RagaCard.module.css';

interface RagaCardProps {
    ragaName: string;
    description: string;
    confidence: string;
}

export default function RagaCard({ ragaName, description, confidence }: RagaCardProps) {
    let confidenceClass = styles.confidenceLow;
    if (confidence.toLowerCase().includes('high')) confidenceClass = styles.confidenceHigh;
    if (confidence.toLowerCase().includes('medium')) confidenceClass = styles.confidenceMedium;

    return (
        <div className={styles.card}>
            <span className={`${styles.confidence} ${confidenceClass}`}>
                Confidence: {confidence}
            </span>
            <h2 className={styles.title}>{ragaName}</h2>
            <p className={styles.description}>{description}</p>
        </div>
    );
}
