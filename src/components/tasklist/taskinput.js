import React, { useState } from 'react';

// TaskInput component: renders an input field and "Add" button for new tasks
export default function TaskInput({ onAdd }) {
  // Local state for the input text
  const [text, setText] = useState('');

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    if (!text.trim()) return; // Ignore empty input
    onAdd(text); // Calls parent handler to add the task
    setText(''); // Clears the input field
  };

  return (
    // Form with input and button
    <form onSubmit={handleSubmit} className="task-input">
      {/* Controlled input for task text */}
      <input
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={e => setText(e.target.value)} // Updates local state on change
      />
      {/* Button to submit the form */}
      <button type="submit">Add</button>
    </form>
  );
}