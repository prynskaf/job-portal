# AlwaysApply Job Portal

## Overview
AlwaysApply is a modern web-based job portal that helps job seekers find and apply for jobs, and enables employers to post and manage job listings.

## Features
- User authentication (email/password, Google)
- Profile management with avatar upload
- Job search and filtering
- Save/bookmark jobs
- Apply for jobs directly
- Track applied and saved jobs
- Responsive design for mobile and desktop
- Employer dashboard (coming soon)

## Tech Stack
- Next.js (React)
- TypeScript
- Redux Toolkit
- Firebase (Firestore, Auth)
- Cloudinary (image uploads)
- SCSS Modules
- Sonner (toast notifications)
- Lucide React (icons)

## Installation

```bash
git clone https://github.com/yourusername/job-portal.git
cd job-portal
npm install
# Add your environment variables in .env.local
npm run dev
```

## Environment Variables

Create a `.env.local` file and add:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

## Contributing

Pull requests are welcome! Please open an issue first to discuss major changes.

## License

MIT

## Contact

For questions or feedback, please open an issue or contact the maintainer.