# MyKeeper App

A full-stack note-taking application built with React and json-server, featuring Google OAuth authentication.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Context API Architecture](#context-api-architecture)
- [Component Documentation](#component-documentation)
- [Usage Guide](#usage-guide)

## Overview

MyKeeper is a modern note-taking application that allows users to create, read, update, and delete notes after authenticating with their Google account. All notes are persisted to a json-server backend, providing a seamless full-stack experience.

## Features

- 🔐 **Google OAuth Authentication** - Secure login with Google credentials
- 📝 **Create Notes** - Add notes with title and content
- ✏️ **Edit Notes** - Update note content inline with ease
- 🗑️ **Delete Notes** - Remove notes with a single click
- 💾 **Persistent Storage** - Notes saved to json-server backend
- 🎨 **Material-UI Components** - Professional UI with Material Design icons
- 🌍 **Context API State Management** - Centralized state without prop drilling

## Tech Stack

### Frontend

- **React** 18.2.0 - UI library
- **@react-oauth/google** 0.12.2 - Google OAuth integration
- **@mui/material** 7.3.4 - Component library
- **@mui/icons-material** 7.3.4 - Icon library
- **@emotion/react** & **@emotion/styled** - CSS-in-JS styling

### Backend

- **json-server** - Mock REST API server
- **Node.js** - Runtime environment

## Project Structure

```
MyKeeper App/
├── public/
│   └── index.html              # Main HTML entry point
├── src/
│   ├── components/
│   │   ├── App.jsx             # Root component
│   │   ├── Header.jsx          # Header with user info and logout
│   │   ├── Auth.jsx            # Google OAuth login page
│   │   ├── CreateArea.jsx      # Note creation form
│   │   ├── Note.jsx            # Individual note component
│   │   └── Footer.jsx          # Footer component
│   ├── contexts/
│   │   └── AppContext.jsx      # Global state management
│   ├── constants/
│   │   └── index.js            # App constants
│   ├── libs/
│   │   └── utils/              # Utility functions
│   ├── index.js                # React DOM render entry
│   └── styles.css              # Global styles
├── db.json                      # json-server database
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## Installation

1. **Clone the repository** (if not already done)

   ```bash
   cd "Full-Stack-Web3-Development-Bootcamp/36.0 React.js/MyKeeper App"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Ensure json-server is installed**
   ```bash
   npm install -g json-server
   # or
   npm install --save-dev json-server
   ```

## Configuration

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add `http://localhost:3000` to authorized redirect URIs
6. Copy your Client ID and update it in `src/index.js`:

```javascript
const CLIENT_ID = "YOUR_CLIENT_ID_HERE";
```

### json-server Configuration

The json-server runs on port 4000 by default (configured in `package.json`):

```json
"server": "json-server --watch db.json --port 4000"
```

## Running the Application

### Development Mode

**Terminal 1 - Start json-server (Backend)**

```bash
npm run server
```

This will start the json-server on `http://localhost:4000` and watch for changes to `db.json`.

**Terminal 2 - Start React Development Server (Frontend)**

```bash
npm run dev
# or
npm start
```

This will start the React app on `http://localhost:3000`.

### Build for Production

```bash
npm run build
```

### Testing

```bash
npm test
```

## API Endpoints

The application communicates with json-server on the following endpoints:

| Method | Endpoint     | Description            |
| ------ | ------------ | ---------------------- |
| GET    | `/notes`     | Fetch all notes        |
| POST   | `/notes`     | Create a new note      |
| PUT    | `/notes/:id` | Update a specific note |
| DELETE | `/notes/:id` | Delete a specific note |

### Example Requests

**Fetch all notes:**

```bash
GET http://localhost:4000/notes
```

**Create a note:**

```bash
POST http://localhost:4000/notes
Content-Type: application/json

{
  "title": "My Note",
  "content": "This is my note content"
}
```

**Update a note:**

```bash
PUT http://localhost:4000/notes/1
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content"
}
```

**Delete a note:**

```bash
DELETE http://localhost:4000/notes/1
```

## Context API Architecture

### AppContext Structure

The `AppContext` provides global state management throughout the application without prop drilling.

**State:**

- `notes` - Array of note objects
- `user` - Current logged-in user object
- `loading` - Loading state for async operations

**Methods:**

- `addNote(newNote)` - Add a new note to the database
- `deleteNote(id)` - Delete a note by ID
- `updateNote(id, updatedNote)` - Update a note by ID
- `handleLogin(credentialResponse)` - Process Google login
- `handleLogout()` - Logout user and clear session
- `fetchNotes()` - Manually refetch all notes

**Usage Example:**

```javascript
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

function MyComponent() {
  const { notes, addNote, user } = useContext(AppContext);

  return <div>{/* Component code */}</div>;
}
```

## Component Documentation

### App.jsx

**Purpose:** Root component that handles authentication and renders the main layout.

**Context Used:**

- `user` - Checks if user is logged in
- `notes` - Displays list of notes
- `loading` - Shows loading state

**Conditional Rendering:**

- If user is not authenticated, renders `<Auth />` component
- If user is authenticated, renders main app with header, create area, notes list, and footer

---

### Header.jsx

**Purpose:** Displays app title and user information with logout button.

**Context Used:**

- `user` - Displays user name and profile picture
- `handleLogout` - Handles logout action

**Features:**

- Shows user's profile picture and name when logged in
- Logout button to end user session

---

### Auth.jsx

**Purpose:** Authentication page with Google OAuth login.

**Context Used:**

- `handleLogin` - Processes login credentials

**Features:**

- Google login button
- Displays welcome message
- Handles authentication errors gracefully

---

### CreateArea.jsx

**Purpose:** Form for creating new notes.

**Context Used:**

- `addNote` - Adds note to database

**Features:**

- Expandable form (clicks to expand)
- Title input (shows only when expanded)
- Content textarea
- Submit button with Material-UI Fab component
- Zoom animation on submit button

**State:**

- `note` - Current form input values
- `isClicked` - Tracks form expansion state

---

### Note.jsx

**Purpose:** Displays individual note with edit and delete functionality.

**Context Used:**

- `notes` - Retrieves note data by ID
- `deleteNote` - Deletes note
- `updateNote` - Updates note

**Features:**

- Display mode - shows note content
- Edit mode - allows inline editing
- Delete button with confirmation
- Edit button to toggle edit mode
- Done button to save changes

**State:**

- `isEditing` - Toggle between view and edit modes
- `updatedNote` - Tracks changes during editing

---

### Footer.jsx

**Purpose:** Simple footer displaying copyright information.

**Features:**

- Displays current year dynamically
- Copyright attribution

## Usage Guide

### Creating a Note

1. Log in with your Google account
2. Click on the content area in the "Create Area"
3. Enter a title (optional, appears on expansion)
4. Enter your note content
5. Click the floating action button (+) to save

### Editing a Note

1. Click the edit icon (pencil) on any note
2. Modify the title and/or content
3. Click the done icon (checkmark) to save changes

### Deleting a Note

1. Click the delete icon (trash bin) on any note
2. The note will be immediately deleted from the database

### Logging Out

1. Click the "Logout" button in the header
2. You'll be redirected to the login page

## Troubleshooting

### Common Issues

**Issue:** "Failed to fetch notes" error

- **Solution:** Ensure json-server is running on port 4000 with `npm run server`

**Issue:** Google login not working

- **Solution:** Verify Client ID is correct in `src/index.js` and localhost:3000 is authorized in Google Cloud Console

**Issue:** Notes not persisting

- **Solution:** Check that `db.json` is writable and json-server is watching the file

**Issue:** Port already in use

- **Solution:** Change port in `package.json` scripts or kill the process using the port

## Development Tips

- Use browser DevTools to inspect the Context API state
- Check network tab to verify API calls to json-server
- Ensure both servers (React and json-server) are running
- Hot reload is enabled, so changes save automatically during development

## Future Enhancements

- [ ] Add note categories/tags
- [ ] Implement search functionality
- [ ] Add dark mode toggle
- [ ] Add note sharing capabilities
- [ ] Implement rich text editing
- [ ] Add note archiving
- [ ] Cloud storage integration
- [ ] Mobile app version

## License

This project is part of the Full-Stack Web3 Development Bootcamp.

## Support

For issues or questions, please refer to the project repository or contact the development team.
