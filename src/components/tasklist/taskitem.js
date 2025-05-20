import React, { useState } from 'react';

// TaskItem component: renders a single task with a checkbox to toggle completion and a delete button
export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [hovered, setHovered] = useState(false);

  // Handle saving the edit
  const handleEditSave = () => {
    if (editText.trim() && editText !== task.text) {
      onEdit(task.id, editText.trim());
    }
    setEditing(false);
  };

  return (
    <div
      className={`task-item${task.completed ? ' completed' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{ display: 'flex', alignItems: 'center' }}>
        {/* Checkbox to toggle completion */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          style={{ marginRight: '0.5em' }}
        />
        {/* Task text or edit input */}
        {editing ? (
          <input
            type="text"
            value={editText}
            autoFocus
            onChange={e => setEditText(e.target.value)}
            onBlur={handleEditSave}
            onKeyDown={e => {
              if (e.key === 'Enter') handleEditSave();
              if (e.key === 'Escape') {
                setEditText(task.text);
                setEditing(false);
              }
            }}
            style={{
              fontSize: '1em',
              marginRight: '0.5em',
              borderRadius: '4px',
              border: '1px solid #ccc',
              padding: '0.2em 0.5em'
            }}
          />
        ) : (
          <>
            <span>{task.text}</span>
            {hovered && (
              <button
                onClick={() => setEditing(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#888',
                  cursor: 'pointer',
                  marginLeft: '0.5em'
                }}
                aria-label="Edit task"
                title="Edit"
                tabIndex={-1}
              >
                &#9998; {/* Pencil icon */}
              </button>
            )}
          </>
        )}
      </span>
      {/* Delete button at the far right */}
      <button
        onClick={() => onDelete(task.id)}
        style={{
          background: 'none',
          border: 'none',
          color: '#d11a2a',
          fontSize: '1.2em',
          cursor: 'pointer',
          marginLeft: '1em'
        }}
        aria-label="Delete task"
        title="Delete"
      >
        &#10006; {/* Unicode cross mark */}
      </button>
    </div>
  );
}