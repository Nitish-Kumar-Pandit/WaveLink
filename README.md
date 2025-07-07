# WaveLink - Modern Blog Platform 🌊

A modern, responsive blog platform built with React, Vite, and Appwrite. Features a clean design inspired by Discord's UI with glassmorphism effects and smooth animations.

## 🚀 Features

- **Modern UI/UX**: Discord-inspired dark theme with glassmorphism effects
- **Authentication**: Secure user registration and login with Appwrite
- **Blog Management**: Create, edit, delete, and manage blog posts
- **Rich Text Editor**: TinyMCE integration for rich content creation
- **File Upload**: Image upload and management with Appwrite Storage
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Smooth Animations**: Framer Motion animations and AOS effects
- **State Management**: Redux Toolkit for efficient state management
- **Routing**: React Router for seamless navigation

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Appwrite (BaaS)
- **State Management**: Redux Toolkit
- **Animations**: Framer Motion, AOS
- **Rich Text**: TinyMCE
- **Icons**: Heroicons, Lucide React, Remix Icons
- **Forms**: React Hook Form

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or bun
- Appwrite account (cloud or self-hosted)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd WaveLink
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your Appwrite configuration:
   ```env
   VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_DATABASE_ID=your_database_id
   VITE_APPWRITE_COLLECTION_ID=your_collection_id
   VITE_APPWRITE_BUCKET_ID=your_bucket_id
   VITE_TINYMCE_API_KEY=your_tinymce_api_key
   ```

4. **Configure Appwrite**

   Follow the detailed setup guide in `APPWRITE_SETUP.md`

5. **Start the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

## 🔧 Appwrite Configuration

### Quick Setup Checklist:

1. ✅ Create Appwrite project
2. ✅ Add web platform (localhost:5173)
3. ✅ Create database
4. ✅ Create posts collection with attributes:
   - `title` (String, required)
   - `content` (String, required)
   - `featuredImage` (String, optional)
   - `status` (String, required)
   - `userId` (String, required)
5. ✅ Create storage bucket for images
6. ✅ Enable email/password authentication
7. ✅ Update environment variables

For detailed instructions, see `APPWRITE_SETUP.md`

## 🧪 Testing the Setup

After configuration, you can test your Appwrite connection:

1. Open the browser console in development mode
2. Run: `window.testAppwriteConnection()`
3. Check the results for any configuration issues

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── appwrite/           # Appwrite service configurations
│   ├── auth.js         # Authentication service
│   └── config.js       # Database and storage service
├── conf/               # Configuration files
├── store/              # Redux store and slices
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── utils/              # Utility functions
└── main.jsx           # Application entry point
```

## 🎨 Design System

- **Colors**: Discord-inspired dark theme (#36393f, #2f3136)
- **Accents**: WaveLink blue (#3b82f6)
- **Typography**: Modern, clean fonts
- **Effects**: Glassmorphism, smooth transitions
- **Layout**: Three-panel layout with responsive design

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_APPWRITE_URL` | Appwrite endpoint URL | Yes |
| `VITE_APPWRITE_PROJECT_ID` | Appwrite project ID | Yes |
| `VITE_APPWRITE_DATABASE_ID` | Database ID | Yes |
| `VITE_APPWRITE_COLLECTION_ID` | Posts collection ID | Yes |
| `VITE_APPWRITE_BUCKET_ID` | Storage bucket ID | Yes |
| `VITE_TINYMCE_API_KEY` | TinyMCE API key | Optional |

## 🐛 Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure your domain is added to Appwrite platform settings
2. **Environment Variables**: Restart dev server after updating `.env`
3. **Permission Errors**: Check Appwrite collection and bucket permissions
4. **Build Errors**: Ensure all required environment variables are set

### Debug Tools:

- Use `window.testAppwriteConnection()` in browser console
- Check browser network tab for API calls
- Review Appwrite console logs

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Appwrite for the excellent BaaS platform
- Discord for UI/UX inspiration
- The React and Vite communities
