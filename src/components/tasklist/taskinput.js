import React, { useState } from 'react';

// TaskInput component: renders an input field and "Add" button for new tasks
export default function TaskInput({ onAdd, disabled = false }) {
  // Local state for the input text
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
    if (!text.trim() || disabled || isSubmitting) return; // Ignore empty input or if disabled

    setIsSubmitting(true);
    try {
      await onAdd(text); // Calls parent handler to add the task (now async)
      setText(''); // Clears the input field only on success
    } catch (error) {
      // Error is handled by the parent component and context
      console.error('Failed to add task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = disabled || isSubmitting;

  return (
    // Form with input and button
    <form onSubmit={handleSubmit} className="task-input" style={{ display: 'grid', gridTemplateColumns: '2em 1fr 2em', alignItems: 'center', gap: '0.5em', padding: '0.2em 0' }}>
      {/* Empty cell for checkbox column */}
      <span />
      {/* Input field in the text column */}
      <input
        type="text"
        placeholder={isSubmitting ? "Adding task..." : "Add a new task..."}
        value={text}
        onChange={e => setText(e.target.value)} // Updates local state on change
        disabled={isDisabled}
        style={{ 
          opacity: isDisabled ? 0.6 : 1,
          cursor: isDisabled ? 'not-allowed' : 'text'
        }}
      />      {/* Loading indicator in delete button column */}
      <span style={{ textAlign: 'center', fontSize: '12px' }}>
        {isSubmitting && <div className="spinner spinner-small"></div>}
      </span>
    </form>
  );
}