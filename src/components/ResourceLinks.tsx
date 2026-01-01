import styles from './ResourceLinks.module.css';

interface Link {
    title: string;
    url: string;
}

interface ResourceLinksProps {
    youtubeLinks: Link[];
    articles: Link[];
}

export default function ResourceLinks({ youtubeLinks, articles }: ResourceLinksProps) {
    if (youtubeLinks.length === 0 && articles.length === 0) return null;

    return (
        <div className={styles.container}>
            {youtubeLinks.length > 0 && (
                <div className={styles.section}>
                    <h3 className={styles.heading}>Performances</h3>
                    <ul className={styles.list}>
                        {youtubeLinks.map((link, index) => (
                            <li key={index} className={styles.listItem}>
                                <a href={link.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                    <span className={styles.icon}>▶️</span>
                                    {link.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {articles.length > 0 && (
                <div className={styles.section}>
                    <h3 className={styles.heading}>Learn More</h3>
                    <ul className={styles.list}>
                        {articles.map((link, index) => (
                            <li key={index} className={styles.listItem}>
                                <a href={link.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                    <span className={styles.icon}>📄</span>
                                    {link.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
