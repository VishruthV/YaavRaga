import { NextResponse } from 'next/server';
import { searchYouTubeVideos } from '@/utils/youtube';

const SYSTEM_PROMPT = `
You are a world-class expert in Hindustani Classical Music with deep knowledge of raga theory and identification.

Your task is to identify the Raga based on the provided Aroha (Ascending) and Avaroha (Descending) notes.

## CRITICAL INSTRUCTIONS:
1. You MUST use Google Search to verify your identification and find real YouTube links and articles
2. Be EXTREMELY CAREFUL - only mark confidence as "High" if you are absolutely certain
3. Show your complete reasoning process step-by-step
4. Consider ALL possibilities before settling on an answer

## NOTATION SYSTEM:
- **Shuddha (Natural) Swaras**: S, R, G, M, P, D, N (uppercase)
- **Komal (Flat) Swaras**: r, g, d, n (lowercase for Re, Ga, Dha, Ni)
- **Tivra (Sharp) Ma**: m (lowercase 'm' represents Tivra Ma / sharp Ma)
- **Octave Prefixes**:
  - m_ = Mandra Saptak (Lower Octave)
  - t_ = Taar Saptak (Higher Octave)
  - No prefix = Madhya Saptak (Middle Octave)

## THE 10 THAATS (Parent Scales):
1. **Bilawal**: S R G M P D N (all natural - like C major)
2. **Khamaj**: S R G M P D n (komal Ni)
3. **Kafi**: S R g M P D n (komal Ga, komal Ni)
4. **Asavari**: S R g M P d n (komal Ga, komal Dha, komal Ni)
5. **Bhairavi**: S r g M P d n (all komal except Sa, Ma, Pa)
6. **Kalyan**: S R G m P D N (tivra Ma - this is the ONLY thaat with sharp Ma)
7. **Marwa**: S r G m P D N (komal Re, tivra Ma)
8. **Purvi**: S r G m P d N (komal Re, tivra Ma, komal Dha)
9. **Todi**: S r g m P d N (komal Re, komal Ga, tivra Ma, komal Dha)
10. **Bhairav**: S r G M P d N (komal Re, komal Dha)

## STEP-BY-STEP ANALYSIS PROCESS:

### Step 1: Identify All Swaras Present
- List all unique notes in both Aroha and Avaroha
- Note which are komal, shuddha, or tivra
- Count total: Audav (5), Shadav (6), or Sampurna (7)

### Step 2: Determine the Thaat
- Match the swaras to one of the 10 Thaats above
- **KEY DISTINCTION**: 
  - Lowercase 'm' = Tivra Ma (sharp) → Points to Kalyan, Marwa, Purvi, or Todi thaat
  - Uppercase 'M' = Shuddha Ma (natural) → Points to other 6 thaats
- If notes don't match a thaat exactly, identify which thaat is closest

### Step 3: Analyze Aroha and Avaroha Patterns
- Are they strictly ascending/descending or do they have vakra (crooked) movements?
- Are any notes skipped (varjit)?
- Are aroha and avaroha symmetric or different?

### Step 4: Consider Common Ragas
Here are some frequently performed ragas to consider:

**Kalyan Thaat (Tivra Ma):**
- Yaman: S R G m P D N / S N D P m G R (sampurna, evening)
- Bhupali: S R G P D / S D P G R S (audav, evening, no Ma or Ni)

**Bilawal Thaat:**
- Alhaiya Bilawal: S R G M P D N / S N D P M G R (morning)
- Deshkar: S R G P D / S D P G R S (audav, similar to Bhupali but Bilawal thaat)

**Kafi Thaat:**
- Kafi: S R g M P D n / S n D P M g R (evening/night)

**Asavari Thaat:**
- Asavari: S R g M P d n / S n d P M g R (morning)

**Bhairavi Thaat:**
- Bhairavi: S r g M P d n / S n d P M g r S (morning)

**Khamaj Thaat:**
- Khamaj: S R G M P D n / S n D P M G R (night)

**Todi Thaat:**
- Todi: S r g m P d N / S N d P m g r S (midday)

**Bhairav Thaat:**
- Bhairav: S r G M P d N / S N d P M G r S (morning)

### Step 5: MANDATORY SEARCH VERIFICATION (CRITICAL!)

**YOU MUST COMPLETE THIS STEP - DO NOT SKIP!**

Before finalizing your answer, you MUST use Google Search to verify your identification.

**Required Search Queries** (perform ALL of these):
1. "raga [your hypothesis] aroha avaroha notes"
2. "raga [your hypothesis] thaat"
3. "site:ragajunglism.org [your hypothesis]" - **MANDATORY REFERENCE SOURCE**
4. If uncertain, search: "ragas with notes [list the swaras]"

**IMPORTANT**: ragajunglism.org is an authoritative source for raga information. You MUST search this site and use it as a primary reference for verification. Include information from ragajunglism.org in your searchEvidence field.

**Verification Checklist** (check ALL items):
- [ ] Does the aroha from search match the input? (exact match required)
- [ ] Does the avaroha from search match the input? (exact match required)
- [ ] Does the thaat from search match your determination?
- [ ] Are there multiple ragas with similar notes? (list them in alternatives)

**Self-Correction Process**:
1. If search results DON'T match your hypothesis → You are WRONG
2. Search for alternative ragas with the same notes
3. Verify the alternative against search results
4. Update your answer based on verified information

**Evidence Requirement**:
- You MUST cite specific sources in your reasoning
- Include URLs of pages that confirmed your answer
- If you cannot find verification, mark confidence as "Low"

### Step 6: Determine Confidence Based on Verification

**Confidence Levels**:
- **High**: Search results PERFECTLY match aroha/avaroha + well-documented raga + multiple sources confirm
- **Medium**: Search results mostly match OR less common raga OR limited sources
- **Low**: No search confirmation OR conflicting sources OR multiple possibilities

**CRITICAL**: If you did not search or cannot verify, you MUST mark confidence as "Low"

## OUTPUT FORMAT (JSON):
{
  "ragaName": "Name of the Raga",
  "thaat": "Parent Thaat",
  "reasoning": "Detailed step-by-step analysis: (1) Swaras identified, (2) Thaat determined, (3) Pattern analysis, (4) Initial hypothesis, (5) Search queries performed and results found, (6) Verification outcome, (7) Final determination",
  "searchQueries": ["query 1", "query 2", "query 3"],
  "searchEvidence": "Key facts found from search results that confirm or refute the identification. Include specific URLs.",
  "verificationStatus": "Verified" | "Partially Verified" | "Unverified",
  "description": "Brief description of the raga's mood (rasa), time of day (prahar), and key characteristics",
  "confidence": "High" | "Medium" | "Low",
  "vadiSamvadi": "Vadi and Samvadi notes if known",
  "alternativePossibilities": ["Other ragas considered"],
  "youtubeLinks": [
    { "title": "Title of performance", "url": "https://youtube.com/..." },
    { "title": "Another performance", "url": "..." },
    { "title": "Another performance", "url": "..." }
  ],
  "articles": [
    { "title": "Raga [Name] - Raga Junglism", "url": "https://ragajunglism.org/ragas/[raga-name-lowercase]" },
    { "title": "Raga [Name] - Indian Classical Music", "url": "https://www.indianclassicalmusic.com/[raga-name-lowercase]" },
    { "title": "Article Title", "url": "..." }
  ]
}

**CRITICAL ARTICLE REQUIREMENTS**:
- The FIRST article MUST always be the ragajunglism.org page for the identified raga
  - Format: https://ragajunglism.org/ragas/[raga-name-lowercase]
  - Example: For "Yaman", use https://ragajunglism.org/ragas/yaman
- The SECOND article MUST always be the indianclassicalmusic.com page for the identified raga
  - Format: https://www.indianclassicalmusic.com/[raga-name-lowercase]
  - Example: For "Yaman", use https://www.indianclassicalmusic.com/yaman
  - Example: For "Bhairav", use https://www.indianclassicalmusic.com/bhairav
- Convert raga name to lowercase and replace spaces with hyphens for both URLs

CRITICAL REQUIREMENTS:
- You MUST perform Google Search verification - this is NOT optional
- DO NOT use markdown formatting. Return raw JSON only.
- YouTube links and articles MUST be real URLs found via Google Search
- searchQueries field MUST list actual queries you performed
- searchEvidence MUST include specific facts from search results
- If search contradicts your hypothesis, you MUST change your answer
- Show complete reasoning including search verification process
- Confidence MUST reflect verification status (no verification = Low confidence)
`;

export async function POST(request: Request) {
    try {
        const { aroha, avaroha } = await request.json();

        if (!aroha || !avaroha) {
            return NextResponse.json(
                { error: 'Aroha and Avaroha are required' },
                { status: 400 }
            );
        }

        const userPrompt = `Identify the Raga for:\nAroha: ${aroha.join(', ')}\nAvaroha: ${avaroha.join(', ')}`;

        // Check for API Key (Gemini)
        const rawApiKey = process.env.GEMINI_API_KEY;
        const apiKey = rawApiKey?.trim(); // Remove any whitespace/newlines

        if (!apiKey) {
            // MOCK RESPONSE for development without API key
            console.warn('No GEMINI_API_KEY found. Using mock response.');
            await new Promise((resolve) => setTimeout(resolve, 1000));
            // Simple mock logic for demonstration
            // Check for basic patterns regardless of octave for mock
            const simpleAroha = aroha.map((n: string) => n.replace(/^[mt]_/, ''));

            const isBilawal = simpleAroha.includes('R') && simpleAroha.includes('G') && simpleAroha.includes('D') && simpleAroha.includes('N');
            const isYaman = simpleAroha.includes('M') && simpleAroha.includes('N') && simpleAroha.includes('R');

            let mockRaga = "Unknown Raga (Mock)";
            if (isBilawal) mockRaga = "Raga Alhaiya Bilawal";
            if (isYaman) mockRaga = "Raga Yaman";

            return NextResponse.json({
                ragaName: mockRaga,
                description: `This is a simulated response because no GEMINI_API_KEY was configured. The system detected notes that might resemble ${mockRaga}.`,
                confidence: "Low (Mock)",
                youtubeLinks: [
                    { title: "Raga Yaman - Rashid Khan", url: "https://www.youtube.com/watch?v=example1" },
                    { title: "Raga Bilawal - Bhimsen Joshi", url: "https://www.youtube.com/watch?v=example2" }
                ],
                articles: [
                    { title: "Introduction to Ragas", url: "https://en.wikipedia.org/wiki/Raga" }
                ]
            });
        }

        if (apiKey) {
            console.log(`Using API Key starting with: ${apiKey.substring(0, 4)}...`);
        }

        // Call Gemini API
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: SYSTEM_PROMPT + "\n\n" + userPrompt }]
                    }],
                    tools: [{
                        google_search: {}
                    }],
                    generationConfig: {
                        response_mime_type: "application/json",
                    }
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Gemini API Error:', errorData);
            throw new Error('Failed to fetch from Gemini API');
        }

        const data = await response.json();
        console.log('Gemini Raw Data:', JSON.stringify(data, null, 2)); // DEBUG LOG

        // Gemini may return multiple parts - find the one with actual JSON content
        const parts = data.candidates?.[0]?.content?.parts || [];
        let textResponse = '';

        // Iterate through all parts to find the one containing JSON
        for (const part of parts) {
            if (part.text && part.text.trim() && part.text.trim() !== '```') {
                // Skip parts that are just markdown delimiters
                if (part.text.includes('{') && part.text.includes('}')) {
                    textResponse = part.text;
                    break;
                }
            }
        }

        if (!textResponse) {
            console.error('No valid JSON found in any part. Parts:', JSON.stringify(parts, null, 2));
            throw new Error('No text response received from Gemini.');
        }

        console.log('Text Response before cleaning:', textResponse); // DEBUG LOG

        // 1. Remove markdown code blocks (common in LLM responses)
        let cleanedResponse = textResponse.replace(/```json\s*/g, "").replace(/```\s*/g, "");

        // 2. Find the first '{' and the last '}' to extract the JSON object
        const firstBrace = cleanedResponse.indexOf('{');
        const lastBrace = cleanedResponse.lastIndexOf('}');

        if (firstBrace !== -1 && lastBrace !== -1) {
            cleanedResponse = cleanedResponse.substring(firstBrace, lastBrace + 1);
        } else {
            // Fallback: Try to find JSON pattern in the original text
            const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                cleanedResponse = jsonMatch[0];
            }
        }

        // 3. Parse the JSON response
        let result;
        try {
            result = JSON.parse(cleanedResponse);
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
            console.error('Cleaned Response:', cleanedResponse);
            throw new Error('Failed to parse Gemini response as JSON');
        }

        // Fetch real YouTube videos using YouTube API
        console.log('Fetching YouTube videos for:', result.ragaName);
        const youtubeVideos = await searchYouTubeVideos(result.ragaName);

        // Replace LLM-generated links with real YouTube API results if available
        if (youtubeVideos.length > 0) {
            result.youtubeLinks = youtubeVideos;
            console.log('Replaced with', youtubeVideos.length, 'real YouTube videos');
        } else {
            console.log('No YouTube videos found via API, keeping LLM-generated links');
        }

        // Add debug info
        result._debug = {
            fullPrompt: SYSTEM_PROMPT + "\n\n" + userPrompt,
            rawResponse: textResponse,
            modelUsed: "gemini-2.0-flash",
            youtubeApiUsed: youtubeVideos.length > 0
        };

        // Log the complete response for debugging
        console.log('=== RAGA IDENTIFICATION RESULT ===');
        console.log('Raga Name:', result.ragaName);
        console.log('Thaat:', result.thaat);
        console.log('Confidence:', result.confidence);
        console.log('Verification Status:', result.verificationStatus);
        console.log('Search Queries:', result.searchQueries);
        console.log('Search Evidence:', result.searchEvidence);
        console.log('Reasoning:', result.reasoning);
        console.log('Vadi/Samvadi:', result.vadiSamvadi);
        console.log('Alternatives:', result.alternativePossibilities);
        console.log('Full Response:', JSON.stringify(result, null, 2));
        console.log('===================================');

        return NextResponse.json(result);

    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
