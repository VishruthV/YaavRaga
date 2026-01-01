# How to Get a Gemini API Key

Follow these steps to generate a free API key for Google Gemini:

1.  **Go to Google AI Studio**
    *   Visit [https://aistudio.google.com/](https://aistudio.google.com/)
    *   Sign in with your Google Account.

2.  **Get API Key**
    *   Click on the **"Get API key"** button in the top-left corner (or "Create API key" in the sidebar).
    *   Click **"Create API key in new project"**.

3.  **Copy the Key**
    *   Once generated, copy the API key string (it starts with `AIza...`).

4.  **Configure Your Project**
    *   In your project folder, create a file named `.env.local` (if it doesn't exist).
    *   Add the following line to the file:
        ```env
        GEMINI_API_KEY=your_copied_api_key_here
        ```
    *   Save the file.

5.  **Restart the Server**
    *   If your development server is running, stop it (Ctrl+C) and restart it:
        ```bash
        npm run dev
        ```

That's it! Your Raga Guesser app will now be able to use the Gemini API to identify ragas.
