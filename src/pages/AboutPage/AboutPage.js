import React from 'react';
import './AboutPage.css';

export default function AboutPage() {
  return (
    <div className="about-page">
      <h1>About This App</h1>
      <p>
        This is a simple multi-page TODO app built using React and a custom GlobalState
        implementation. It showcases how to manage shared state across components without
        third-party libraries.
      </p>
      <p>
        The project was developed with a focus on functional design and responsive styling,
        making it mobile-friendly and easy to use.
      </p>
      <p>
        Styling, animations, and UI elements were chosen to reflect my own creative
        preferences as encouraged by the assignment.
      </p>
    </div>
  );
}