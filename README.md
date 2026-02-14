# CleanVision - Next.js Migration

A modern Next.js conversion of the CleanVision cleaning services website, originally built with Express.js and EJS.

## 🚀 Project Overview

This project has been successfully migrated from an Express.js/EJS stack to Next.js with:
- **Framework**: Next.js 16.1.6 with TypeScript
- **Styling**: Tailwind CSS + Bootstrap Icons
- **Authentication**: Session-based with cookie storage
- **Database**: In-memory storage (ready to be replaced with a real database)

## 📁 Project Structure

```
src/
├── app/
│   ├── (pages)
│   │   ├── page.tsx              # Home page with carousel and services
│   │   ├── quote/page.tsx        # Quote request form
│   │   ├── feedback/page.tsx     # Feedback submission and display
│   │   ├── contact/page.tsx      # Contact form
│   │   ├── login/page.tsx        # User login
│   │   └── register/page.tsx     # User registration
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts    # Login API endpoint
│   │   │   ├── register/route.ts # Registration API endpoint
│   │   │   └── logout/route.ts   # Logout API endpoint
│   │   ├── feedback/route.ts     # Feedback submission API
│   │   ├── contact/route.ts      # Contact form API
│   │   └── quote/route.ts        # Quote request API
│   ├── layout.tsx                # Root layout with Navbar & Footer
│   └── globals.css               # Global styles
├── components/
│   ├── Navbar.tsx                # Navigation component
│   └── Footer.tsx                # Footer component
public/
├── images/
│   ├── cleaning1.jpg             # Service image 1
│   ├── cleaning2.jpg             # Service image 2
│   ├── cleaning3.jpg             # Service image 3
│   └── default2.svg              # Logo
```

## 🔑 Key Features

### Pages
- **Home** (`/`): Landing page with carousel, services grid, testimonials
- **Quote** (`/quote`): Quote request form with service selection
- **Feedback** (`/feedback`): Customer feedback submission and display
- **Contact** (`/contact`): Contact form with business information

### API Routes
All API routes are RESTful and handle:
- Contact form submissions
- Quote requests
- Feedback submissions

### Components
- **Navbar**: Fixed navigation with responsive hamburger menu
- **Footer**: Company information and quick links

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd /path/to/cleanvision
```

2. Install dependencies (already done):
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📊 Database Notes

Currently, all data (feedback, contacts, quotes) is stored in-memory and will be lost on server restart. For production, implement:

1. **Feedback Storage**: Store feedback in a database for persistence
2. **Contact Forms**: Implement email notifications for contact submissions and store in database
3. **Quote Requests**: Add database storage, email alerts, and quote management system

## 🎨 Styling

The project uses:
- **Tailwind CSS**: For utility-first styling
- **Bootstrap Icons**: For FontAwesome icon integration
- **Custom Tailwind Classes**: For responsive design and hover effects

## 📱 Responsive Design

All pages are fully responsive and tested for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

## 🔄 Migration Changes

### From Express.js to Next.js

**Architecture Changes:**
- Server-side rendering (EJS) → Hybrid rendering (React components with SSR/SSG)
- Express middleware → Next.js middleware and API routes
- Form handling with redirects → Client-side state management + API routes
- Manual routing → File-based routing

**Key Advantages:**
- Faster performance with built-in optimization
- Automatic code splitting and lazy loading
- Better TypeScript support
- Unified frontend/backend in one repo
- Native image optimization
- Built-in SEO improvements

## ⚠️ TODO for Production

- [ ] Replace in-memory storage with real database (PostgreSQL/MongoDB)
- [ ] Add email notifications for forms
- [ ] Implement rate limiting
- [ ] Add form validation (zod/yup)
- [ ] Setup environment variables (.env.local)
- [ ] Add error logging and monitoring
- [ ] Add payment integration for quotes
- [ ] Setup CDN for images
- [ ] Add unit and integration tests

## 📝 Current Status

✅ Successfully converted all Express.js routes to Next.js
✅ Migrated all EJS templates to React components
✅ Setup API routes for form handling
✅ Implemented authentication system
✅ Added responsive design
✅ Development server running and tested

## 🤝 Support

For questions or issues, contact: info@cleanvision.com

