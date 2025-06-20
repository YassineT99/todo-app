import React from 'react';
import './AboutPage.css';

/**
 * AboutPage Component
 * 
 * Displays information about the todo application, its features, and implementation details.
 * This component serves as documentation for the app's capabilities and technical approach.
 * 
 * Key sections:
 * - Application overview and API integration benefits
 * - Feature descriptions (task management, persistence, UI/UX)
 * - Technical implementation details (React patterns, GSAP, async operations)
 * - User experience design decisions (shared vs. private task lists)
 * - Production considerations (authentication methods, scalability)
 * 
 * @returns {JSX.Element} The rendered About page
 */
export default function AboutPage() {
  return (
    <div className="about-page">
      <h1>About This App</h1>
      
      <p>
        This is a modern React todo application that demonstrates real-world API integration 
        using the Todoist API. Instead of storing tasks locally, all data is persisted 
        through Todoist's cloud services, providing a genuine productivity tool experience.
      </p>
      
      <p>
        The app features seamless task management with automatic synchronization, allowing 
        you to add, edit, complete, and delete tasks that persist across sessions and devices. 
        Tasks are always appended to the end of the list and automatically load on page refresh.
      </p>
      
      <p>
        Built with modern React patterns including custom hooks, context providers, and 
        async/await for API operations. The UI includes smooth loading indicators with 
        circular spinners, optimistic updates for better user experience, and comprehensive 
        error handling for network operations.
      </p>
      
      <p>
        The design emphasizes clean aesthetics with a responsive layout that works beautifully 
        on both desktop and mobile devices. Navigation features GSAP-powered animations for 
        smooth transitions between pages.
      </p>
      
      <p>
        This project demonstrates practical skills in API integration, state management, 
        error handling, and creating production-ready React applications that users can 
        actually rely on for their daily productivity needs.
      </p>
      
      <p>
        <strong>User Experience Design:</strong> Currently, this app uses a shared task list 
        that everyone can see and edit together - perfect for demonstrating the API integration 
        without any setup hassle. In a real-world app, you'd want your own private tasks! 
      </p>
      
      <p>
        For a production version, the app would handle user authentication seamlessly behind 
        the scenes. Users would simply sign up with an email and password (or use Google/Apple 
        sign-in), and the app would automatically manage the API connections. No need for users 
        to understand or obtain API keys themselves - that's all handled by the backend infrastructure. 
        Each user would then have their own private, secure task list while enjoying the same 
        smooth experience you see here.
      </p>
    </div>
  );
}