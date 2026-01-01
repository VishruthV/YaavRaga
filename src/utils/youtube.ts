interface YouTubeVideo {
    title: string;
    url: string;
}

export async function searchYouTubeVideos(ragaName: string): Promise<YouTubeVideo[]> {
    const apiKey = process.env.YOUTUBE_API_KEY;

    // If no API key, return empty array (will fallback to LLM)
    if (!apiKey) {
        console.warn('YOUTUBE_API_KEY not found. Skipping YouTube API search.');
        return [];
    }

    try {
        const query = encodeURIComponent(`raga ${ragaName} hindustani classical music`);
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=3&key=${apiKey}`;

        const response = await fetch(url);

        if (!response.ok) {
            console.error('YouTube API error:', response.status, response.statusText);
            return [];
        }

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            console.warn('No YouTube videos found for:', ragaName);
            return [];
        }

        return data.items.map((item: any) => ({
            title: item.snippet.title,
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`
        }));
    } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        return [];
    }
}
