import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

/*
  TaskItem component:
  - Renders a single task row with a checkbox, task text, edit (pencil) button, and delete button.
  - Supports editing the task text and toggling completion with async API calls.
  - Uses GSAP to animate the pencil icon on hover.
*/
export default function TaskItem({ task, onToggle, onDelete, onEdit, disabled = false }) {
  // State for editing mode and the current edit text
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [isUpdating, setIsUpdating] = useState(false);

  // State for whether the row is hovered (to show the pencil icon)
  const [hovered, setHovered] = useState(false);

  // Ref for the pencil (edit) button so GSAP can animate it
  const pencilRef = useRef(null);

  // Update editText when task.text changes (from API updates)
  useEffect(() => {
    setEditText(task.text);
  }, [task.text]);

  // Animate the pencil icon in/out on hover using GSAP
  useEffect(() => {
    if (hovered && pencilRef.current && !disabled && !isUpdating) {
      // Slide in and fade in the pencil icon
      gsap.to(pencilRef.current, { 
        x: 0, 
        opacity: 1, 
        duration: 0.3, 
        ease: "power2.out",
        pointerEvents: "auto"
      });
    } else if (pencilRef.current) {
      // Slide out and fade out the pencil icon
      gsap.to(pencilRef.current, { 
        x: 10, 
        opacity: 0, 
        duration: 0.2, 
        ease: "power2.in",
        pointerEvents: "none"
      });
    }
  }, [hovered, disabled, isUpdating]);

  // Save the edited text and exit editing mode
  const handleEditSave = async () => {
    if (editText.trim() && editText !== task.text && !disabled) {
      setIsUpdating(true);
      try {
        await onEdit(task.id, editText.trim());
      } catch (error) {
        // Revert the text on error
        setEditText(task.text);
      } finally {
        setIsUpdating(false);
      }
    }
    setEditing(false);
  };

  // Handle checkbox toggle
  const handleToggle = async () => {
    if (disabled || isUpdating) return;
    
    setIsUpdating(true);
    try {
      await onToggle(task.id);
    } catch (error) {
      console.error('Failed to toggle task:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (disabled || isUpdating) return;
    
    setIsUpdating(true);
    try {
      await onDelete(task.id);
    } catch (error) {
      console.error('Failed to delete task:', error);
      setIsUpdating(false); // Only reset if delete failed
    }
  };

  const isDisabled = disabled || isUpdating;

  return (
    <div
      className={`task-item${task.completed ? ' completed' : ''}${isDisabled ? ' disabled' : ''}`}
      onMouseEnter={() => !isDisabled && setHovered(true)}   // Show pencil on hover
      onMouseLeave={() => setHovered(false)}  // Hide pencil when not hovered
      style={{ opacity: isDisabled ? 0.6 : 1 }}
    >
      {/* Checkbox column: toggles completion */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
        disabled={isDisabled}
        style={{ margin: 0, cursor: isDisabled ? 'not-allowed' : 'pointer' }}
      />

      {/* Middle column: task text and pencil icon */}
      <span className="task-text">
        {editing ? (
          // If editing, show an input field
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
            disabled={isDisabled}
            style={{
              fontSize: '1em',
              borderRadius: '4px',
              border: '1px solid #ccc',
              padding: '0.2em 0.5em',
              width: '100%',
              opacity: isDisabled ? 0.6 : 1
            }}
          />
        ) : (
          // If not editing, show the task text and the pencil icon
          <>
            {/* Task text (strikethrough if completed) */}            <span className={task.completed ? 'completed' : ''}>
              {task.text}
              {isUpdating && <span style={{ marginLeft: '8px' }}><div className="spinner spinner-inline"></div></span>}
            </span>
            {/* Pencil (edit) button, animated with GSAP */}
            <button
              ref={pencilRef}
              onClick={() => !isDisabled && setEditing(true)}
              aria-label="Edit task"
              title="Edit"
              disabled={isDisabled}
              style={{
                background: 'none',
                border: 'none',
                color: isDisabled ? '#ccc' : '#888',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                opacity: 0,                // Start hidden
                transform: 'translateX(10px)', // Start shifted right
                pointerEvents: 'none',     // Not clickable until shown
                marginLeft: '0.5em'
              }}
              tabIndex={-1} // Prevent tab focus when hidden
            >
              &#9998; {/* Unicode pencil icon */}
            </button>
          </>
        )}
      </span>

      {/* Delete button column */}
      <button
        onClick={handleDelete}
        disabled={isDisabled}
        style={{
          background: 'none',
          border: 'none',
          color: isDisabled ? '#ccc' : '#d11a2a',
          fontSize: '1.2em',
          cursor: isDisabled ? 'not-allowed' : 'pointer'
        }}
        aria-label="Delete task"
        title="Delete"
      >
        &#10006; {/* Unicode X icon */}
      </button>
    </div>
  );
}