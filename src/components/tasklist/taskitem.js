import React from 'react';

// TaskItem component: renders a single task with a checkbox to toggle completion
export default function TaskItem({ task, onToggle }) {
  return (
    // Add 'completed' class if the task is completed for strikethrough styling
    <div className={`task-item${task.completed ? ' completed' : ''}`}>
      {/* Checkbox to toggle completion */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)} // Calls parent handler to toggle
        style={{ marginRight: '0.5em' }}
      />
      {/* Task text */}
      {task.text}
    </div>
  );
}