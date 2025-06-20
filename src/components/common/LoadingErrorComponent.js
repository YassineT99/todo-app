import React from 'react';
import { useTodo } from '../../contexts/TodoContext';
import './LoadingErrorComponent.css';

/**
 * LoadingErrorComponent - Shows loading states and error messages
 * 
 * This component displays loading indicators and error messages
 * for API operations. It can be placed anywhere in the app to
 * show the current state of async operations.
 */
const LoadingErrorComponent = ({ showLoadingText = true, inline = false }) => {
  const { loading, error, clearError } = useTodo();

  if (!loading && !error) {
    return null;
  }

  const containerClass = `loading-error-container ${inline ? 'inline' : 'block'}`;

  return (
    <div className={containerClass}>
      {loading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          {showLoadingText && <span className="loading-text">Syncing with Todoist...</span>}
        </div>
      )}
      
      {error && (
        <div className="error-banner">
          <div className="error-content">
            <span className="error-icon">⚠️</span>
            <span className="error-text">{error}</span>
            <button 
              className="error-dismiss"
              onClick={clearError}
              title="Dismiss error"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingErrorComponent;
