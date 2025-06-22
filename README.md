# Todo App

A modern, production-ready todo list application built with React and integrated with the Todoist API.  
Features real-world API integration, persistent cloud storage, and a seamless user experience with professional-grade animations and loading states.

---

## Features

### Core Functionality
- **Real API Integration** - Uses Todoist API for genuine cloud persistence
- **Cross-device Synchronization** - Tasks sync across all your devices
- **Complete CRUD Operations** - Add, edit, complete, and delete tasks with API persistence
- **Optimistic Updates** - UI responds instantly while syncing in background
- **Comprehensive Error Handling** - Graceful handling of network issues and API errors

### User Experience
- **Trello-style Interface** - Input bar moves as you add tasks, always at the bottom
- **Inline Editing** - Edit tasks directly with pencil icon hover animations
- **Modern Loading States** - Smooth circular spinners instead of static indicators  
- **Responsive Design** - Works beautifully on desktop and mobile devices
- **Clean Aesthetics** - Professional UI with thoughtful color scheme and spacing

### Technical Features
- **Modern React Patterns** - Custom hooks, context providers, and async/await
- **GSAP Animations** - Smooth navigation transitions and hover effects
- **Auto-authentication** - Seamless connection with environment-based API tokens
- **State Management** - Robust context-based state with proper error boundaries
- **Production Ready** - Includes proper error handling, loading states, and user feedback

---

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- A Todoist account (for API integration)

### Setup

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd todo-app
   npm install
   ```

2. **Configure Todoist API:**
   - Get your API token from [Todoist Settings → Integrations](https://todoist.com/prefs/integrations)
   - Create a `.env` file in the project root:
     ```env
     REACT_APP_TODOIST_TOKEN=your_api_token_here
     ```

3. **Run the application:**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Architecture

### API Integration
- **Todoist REST API v2** - Full CRUD operations with proper error handling
- **Auto-project Creation** - Automatically creates "My Todo App" project in Todoist
- **Token Management** - Secure API token handling with environment variables
- **Network Resilience** - Retry logic and graceful degradation for network issues

### State Management
- **TodoContext** - Centralized state management replacing local storage
- **Optimistic Updates** - UI updates immediately, syncs with API in background
- **Error Recovery** - Automatic rollback on API failures with user notification

### Component Architecture
```
TodoProvider (Context)
├── Navbar (GSAP animations)
├── TodoPage
│   ├── TaskList (Main container)
│   │   ├── TaskInput (Add new tasks)
│   │   └── TaskItem[] (Individual tasks)
│   └── LoadingErrorComponent (Status indicators)
├── HomePage (Landing page)
└── AboutPage (Documentation)
```

---

## Dependencies

### Core
- **react** (^18.x) - Modern React with hooks and concurrent features
- **react-dom** - DOM bindings for React
- **react-router-dom** - Client-side routing for multi-page navigation

### Animation & UI
- **gsap** - GreenSock Animation Platform for smooth animations
- **CSS3** - Modern CSS with flexbox, grid, and custom properties

### API & State
- **Todoist API v2** - RESTful API for task management
- **fetch** - Native browser API for HTTP requests
- **React Context** - Built-in state management solution

---

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── AuthComponent.js          # API token authentication
│   │   └── AuthComponent.css
│   ├── common/
│   │   ├── LoadingErrorComponent.js  # Reusable loading/error states
│   │   └── LoadingErrorComponent.css
│   ├── navigationbar/
│   │   ├── navbar.js                 # GSAP-animated navigation
│   │   └── navbar.css
│   └── tasklist/
│       ├── tasklist.js               # Main task container
│       ├── taskinput.js              # Add new tasks
│       └── taskitem.js               # Individual task items
├── contexts/
│   └── TodoContext.jsx               # Global state management
├── pages/
│   ├── AboutPage/
│   │   ├── AboutPage.js              # App documentation
│   │   └── AboutPage.css
│   ├── HomePage/
│   │   ├── HomePage.js               # Landing page
│   │   └── HomePage.css
│   └── ToDoPage/
│       ├── TodoPage.js               # Main todo interface
│       └── TodoPage.css
├── services/
│   └── todoistApi.js                 # Todoist API service layer
├── App.js                            # Main app component
├── App.css                           # Global styles
└── index.js                          # React app entry point
```

---

## Key Technical Decisions

### Why Todoist API?
- **Real-world Integration** - Demonstrates actual API consumption patterns
- **Data Persistence** - Tasks survive browser restarts and work across devices
- **Professional Experience** - Shows ability to work with external services
- **Error Handling** - Provides opportunities to implement robust error management

### Architecture Choices
- **Context over Redux** - Simpler state management for this scope
- **Custom Hooks** - Encapsulated logic with clean component interfaces
- **Optimistic Updates** - Better UX with immediate feedback
- **CSS-in-Files** - Maintainable styling with component co-location

### UX Design Principles
- **Shared Demo Environment** - Easy testing without individual account setup
- **Progressive Enhancement** - Works with JavaScript, enhanced with animations
- **Mobile-First** - Responsive design prioritizing mobile experience
- **Accessibility** - Proper ARIA labels and keyboard navigation support

---

## Production Considerations

### Current Demo vs. Production
- **Demo**: Shared task list using common API token for easy testing
- **Production**: Individual user authentication with private task lists
- **Scaling**: Backend service to manage API tokens and user sessions
- **Security**: OAuth flow instead of direct API token management

### Potential Enhancements
- User authentication system (email/password, OAuth)
- Real-time collaboration features
- Offline support with sync when online
- Task categories and advanced filtering
- Drag-and-drop task reordering
- Due dates and notifications

---

## License

MIT License - Feel free to use this project as a learning resource or starting point for your own applications.

---

## Created by

**Yassine Toumi**  
*Ui/UX Designer and Front-End Developer*

This project demonstrates modern React development practices, API integration patterns, and production-ready application architecture.
