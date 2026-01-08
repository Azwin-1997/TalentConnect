ARCHITECTURE OVERVIEW

This document describes the architectural decisions used in the Saved Jobs feature.

DESIGN GOALS
- Keep UI components focused on presentation
- Centralize shared state used across multiple pages
- Isolate data persistence from UI logic
- Make the system backend-ready

HIGH-LEVEL ARCHITECTURE

UI Components
   ↓
Context + useReducer (Global State)
   ↓
Service Layer (Persistence)
   ↓
Data Source (localStorage / API)

LAYERS

1. UI Layer (Pages & Components)
- Renders UI
- Handles user interactions
- Does not access storage or APIs directly
- Presentational components contain no business logic

2. Container Components
- Connect UI to global state
- Handle save / unsave actions
- Pass props to presentational components
- Separate logic from layout

3. Global State (Context + useReducer)
- Used because saved jobs are shared across multiple pages
- Keeps state in sync across navigation
- Reducer manages predictable state transitions
- Avoids prop drilling and duplicated logic

4. Service Layer
- Handles data persistence
- Abstracts storage mechanism from UI
- Currently uses localStorage
- Can be replaced with backend APIs without UI changes

UI FEEDBACK
- Toast notifications are handled at the UI layer
- Services and reducers do not trigger UI feedback

SCALABILITY
- Easy to migrate to backend APIs
- Can adopt Redux Toolkit if state complexity grows
- Supports additional global state features

SUMMARY
The project follows a layered architecture within a modular monolith.
Each layer has a clear responsibility, improving maintainability,
scalability, and clarity.
