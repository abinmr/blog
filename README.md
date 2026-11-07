# React & Firebase Blog Application

A text-based CRUD blog application built to practice and demonstrate core and advanced React concepts, including global state management with the **Context API**, dynamic client-side routing with **React Router**, and serverless backend integration using **Firebase Authentication** and **Cloud Firestore**.

## Features

### Authentication & State Management
* **Firebase Authentication:** User sign-up, login, and logout flows.
* **Global Auth Context:** Centralized authentication state managed via React's Context API, providing user session data across the component tree without prop drilling.
* **Protected Routes:** Restricts access to blog creation and editing pages strictly to authenticated users.

### Blog CRUD Operations
* **Create:** Publish new text-only blog posts directly to Cloud Firestore.
* **Read:** Fetch and display an asynchronous list of all published blog posts.
* **Update:** Edit existing blog posts using pre-populated forms via dynamic route parameters.
* **Delete:** Remove blog posts from the Firestore database.

### Routing & Navigation
* Built with `react-router-dom` for seamless Single Page Application (SPA) transitions.
* Utilizes dynamic route parameters (e.g., `/edit/:id`) to load specific post data for editing.
* Programmatic navigation upon login, logout, and form submission.

---

## Tech Stack

* **Runtime & Package Manager:** Bun
* **Frontend:** React (Hooks, Context API)
* **Routing:** React Router (`react-router-dom`)
* **Backend / BaaS:** Firebase
  * **Firebase Auth** (User authentication)
  * **Cloud Firestore** (NoSQL database for blog posts)

---

## Pages & Route Structure

| Route | Page | Access | Description |
| :--- | :--- | :--- | :--- |
| `/login` | **Login Page** | Public | Authenticate existing users or register a new account. |
| `/` | **Blog List Page** | Public / Protected | View all published blog posts with options to edit or delete. |
| `/add` | **Add Blog Page** | Protected | Form to create and submit a new blog post. |
| `/edit/:id` | **Edit Blog Page** | Protected | Fetches post by `:id` parameter and allows updating content. |

---

## Getting Started (Local Setup)

Follow these steps to clone the project and run it locally on your machine.

### 1. Prerequisites
* **Bun** installed on your machine ([Install Bun](https://bun.sh/))
* A **Firebase account** to set up the backend database and authentication.

### 2. Clone the Repository
```bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name
```

### 3. Install Dependencies
```bash
bun install
```

### 4. Configure Firebase
Because Firebase keys and project configurations are specific to your own database instance, you need to set up a Firebase project before running the app:

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Navigate to **Build > Authentication**, click **Get Started**, and enable the **Email/Password** (or Google) sign-in provider.
3. Navigate to **Build > Firestore Database**, click **Create Database**, and start in **Test Mode** (or configure your security rules).
4. Go to **Project Settings** (gear icon) > **General**, scroll down to **Your apps**, and register a new **Web App** (`</>`).
5. Copy the `firebaseConfig` credentials provided.

### 5. Set Up Environment Variables
Create a `.env` file in the root directory of the project and add your Firebase configuration keys:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 6. Run the Development Server
```bash
bun run dev
```
Open the local URL shown in your terminal (typically `http://localhost:5173`) to view the app in your browser.

---

## Key Concepts Practiced

* **Context API (`createContext`, `useContext`):** Wrapping the application in an `AuthProvider` to listen to Firebase's `onAuthStateChanged` observer and expose user state globally.
* **React Router (`useParams`, `useNavigate`, `<Navigate />`):** Extracting post IDs from the URL for targeted Firestore queries, redirecting users after CRUD actions, and guarding routes with custom wrapper components.
* **Asynchronous Firestore Operations:** Handling loading and error states while performing `addDoc`, `getDocs`, `getDoc`, `updateDoc`, and `deleteDoc` operations.
