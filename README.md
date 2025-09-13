# Wedding Photo & Video Uploader

A beautiful, elegant wedding-themed website that allows guests to easily upload photos and videos from the wedding. All uploaded files are securely stored in Supabase storage.

## Features

- Wedding-themed landing page with couple's name and date
- Simple and intuitive upload interface for photos and videos
- Mobile-first responsive design
- Progress indicators and success/error messages
- Secure storage using Supabase

## Setup Instructions

### Prerequisites

- Node.js (v16 or later)
- Supabase account (free tier works fine)

### Supabase Setup

1. Create a new Supabase project at [https://supabase.com](https://supabase.com)
2. Once your project is created, go to Storage in the sidebar and create a new bucket named `wedding-uploads`
3. Set the bucket's privacy settings to allow uploads (you may want to restrict access based on your needs)
4. From your Supabase project dashboard, copy your project URL and anon/public key

### Local Development

1. Clone this repository
2. Copy `.env.example` to `.env` and fill in your Supabase credentials:
   ```
   cp .env.example .env
   ```
3. Edit the `.env` file with your Supabase URL and anon key
4. Install dependencies:
   ```
   npm install
   ```
5. Start the development server:
   ```
   npm run dev
   ```
6. Open your browser to the URL shown in the terminal (typically http://localhost:5173)

### Customization

To customize the wedding details:

1. Open `src/App.tsx` and update the `coupleNames` and `weddingDate` variables
2. Modify the styling in `src/App.css` if desired

### Deployment

This project is ready to deploy on Vercel:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Add your Supabase environment variables in the Vercel project settings
4. Deploy!

## Managing Uploads

All uploaded files will be stored in your Supabase storage bucket. You can manage them through the Supabase dashboard:

1. Log in to your Supabase account
2. Navigate to the Storage section
3. Browse the `wedding-uploads` bucket
4. Download, delete, or manage permissions for the uploaded files

## License

MIT
