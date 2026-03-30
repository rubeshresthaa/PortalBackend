
## Tech Stack
-   **Frontend:** React (Vite), Tailwind CSS, Redux Toolkit (RTK Query), React Router, React Hot Toast
-   **Backend:** NestJS, TypeScript, MongoDB (Mongoose), JWT Security
-   **Icons & styling:** lucide-react, Google Inter Fonts, Glassmorphism elements

## Features
-   Secure JWT-based authentication
-   User registration and personalized login functionality
-   Full dashboard to view user status and properties
-   Adding, managing, and securely deleting favourite properties
-   "My Favourites" are strictly scoped to the currently authenticated user

##  Running the App Locally

### 1. Start the Backend
Navigate to your backend directory:
```bash
npm install
# Make sure your .env has MONGO_URI setup and JWT_SECRET in backend env file
npm run start:dev
```
The backend starts on **http://localhost:3001**, **https://portal-backend-xi.vercel.app** and allows CORS from `http://localhost:3000`, `https://portal-frontend-red.vercel.app` (or your frontend url).

### 2. Start the Frontend
In a separate terminal, navigate to the frontend folder:
```bash

npm install
npm run dev
```
The application will be running locally (`3000`).
f

---

## Example Flow
1.  **Welcome / Register:** Navigate to the `/register` route. Input your `First Name`, `Last Name`, `Email`, and `Password`. Currently there is only One role (Buyer). We can add other roles in future.
2.  **Login:** Head to `/login` to sign in. It redirects to `/`.
3.  **Dashboard:** Access the `/profile`. You will see your name dynamically fetched. You will see 3 tabs:All Properties,my Properties, and My favourites.
  All Properties:Shows all the existing properties.
  My Properties:Shows all the properties added by the user. Where we can delete and edit the properties.
  My Favourites:Shows all the properties marked as favourite.
4.  **Create properties:** Click on `Add Property`. A modal pops up. Enter dummy property info, hit "Create Property". We can create the property in my properties tab.
5.  **Remove properties:** Click the *Trash* icon on any property card to cleanly delete it. The UI feels instant thanks to optimized RTK slice invalidation.
6.  **Mark as favourite:** Click the *Bookmark* icon on any property card to mark it as favourite.
7.**Edit properties:** Click the *Edit* icon on any property card to edit it.
