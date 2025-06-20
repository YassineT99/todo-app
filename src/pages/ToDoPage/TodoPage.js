import React from 'react';
import TaskList from '../../components/tasklist/tasklist';
import { useTodo } from '../../contexts/TodoContext';
import './ToDoPage.css'

export default function ToDoPage() {
  const { error, clearError } = useTodo();

  return (
    <div className="todo-page">
      {/* Only show errors if they occur */}
      {error && (
        <div className="error-banner" style={{ margin: '10px 0', padding: '10px', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', borderRadius: '6px' }}>
          <span style={{ color: '#721c24' }}>{error}</span>
          <button 
            onClick={clearError}
            style={{ marginLeft: '10px', background: 'none', border: 'none', color: '#721c24', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
      )}
      <TaskList />
    </div>
  );
}