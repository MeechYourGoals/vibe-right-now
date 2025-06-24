# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/6615c5b7-93f5-41b0-b375-6a37437bdc16

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/6615c5b7-93f5-41b0-b375-6a37437bdc16) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/6615c5b7-93f5-41b0-b375-6a37437bdc16) and click on Share -> Publish.

## Supabase setup

Make sure the `DEEPGRAM_API_KEY` environment variable is defined in your Supabase project so the Deepgram speech functions can operate correctly.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

## Setting the `DEEPGRAM_API_KEY` for Supabase functions

Some Supabase Edge Functions in this repo use Deepgram for text-to-speech. These functions expect a `DEEPGRAM_API_KEY` environment variable to be available.

Make sure **not** to commit your API key to the repository. Add the key to a `.env` file for local development or provide it in your deployment dashboard when you deploy the functions.

## Configuring Google AI keys

Several Supabase Edge Functions rely on Google Vertex/Gemini services. Set the `GEMINI_API_KEY` (and `GOOGLE_VERTEX_API_KEY` for compatibility) in a `.env` file or in your Supabase project settings. These should contain the same API key with access to Google Gemini and related services.

An example `.env` file:

```bash
GEMINI_API_KEY=your-google-api-key
GOOGLE_VERTEX_API_KEY=your-google-api-key
```
