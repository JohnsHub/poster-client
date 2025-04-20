# Poster Client: React Frontend

## Overview

Poster Client is the web front‑end for the Poster social platform. It provides a modern, responsive interface for authenticated users to view, create, edit, and delete posts, as well as comment on, like, and retweet content in real time.

## Key Features

- **User Authentication**: Secure login and registration flows powered by JWT, with token stored in context and attached to API requests.
- **Real‑Time Feed**: Display latest posts, automatically update on creation, edit in place, and remove without full‑page reload.
- **Interactive Components**: Inline comment lists, like and retweet buttons, and editable post forms.
- **Responsive Design**: Mobile‑first layout using Bootstrap 5 and custom CSS for a clean, intuitive user experience.
- **Modular Architecture**: Separation of concerns with React Context for authentication, Axios instance for API calls, and reusable UI components.

## Technology Stack

| Category       | Technology                      |
|----------------|---------------------------------|
| Framework      | React                           |
| Routing        | React Router v6                 |
| Styling        | Bootstrap 5, custom CSS         |
| State & Context| React Context API               |
| HTTP Client    | Axios                           |
| Icons          | React Icons (FontAwesome)       |

## Project Structure

```
poster-client/
├─ src/
│  ├─ api/
│  │  └─ axios.js            # preconfigured Axios instance
│  ├─ components/
│  │  ├─ EditPostForm.jsx
│  │  ├─ NewCommentForm.jsx
│  │  ├─ PostCard.jsx
│  │  ├─ CommentsList.jsx
│  │  └─ NavigationBar.jsx
│  ├─ context/
│  │  └─ AuthContext.jsx     # authentication state and JWT handling
│  ├─ pages/
│  │  ├─ Home.jsx            # main feed page
│  │  ├─ LoginForm.jsx
│  │  └─ RegisterForm.jsx
│  ├─ App.jsx                # route definitions and wrapper
│  ├─ index.js               # application entry point
│  └─ index.css              # global styles and theme
├─ public/
│  └─ index.html
├─ package.json
└─ README.md

