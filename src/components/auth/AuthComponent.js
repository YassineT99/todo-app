import React, { useState } from 'react';
import { useTodo } from '../../contexts/TodoContext';
import './AuthComponent.css';

/**
 * AuthComponent - Handles Todoist API authentication
 * 
 * This component allows users to enter their Todoist API token
 * and authenticate with the service. It shows authentication status
 * and provides helpful instructions.
 */
const AuthComponent = () => {
  const { authenticate, isAuthenticated, loading, error, clearError } = useTodo();
  const [token, setToken] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token.trim()) return;
    
    clearError();
    await authenticate(token.trim());
  };

  const handleTokenChange = (e) => {
    setToken(e.target.value);
    if (error) clearError();
  };

  if (isAuthenticated) {
    return (
      <div className="auth-success">
        <div className="auth-success-icon">✅</div>
        <p>Connected to Todoist successfully!</p>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Connect to Todoist</h2>
        <p>To use this app, you need to connect it to your Todoist account using an API token.</p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="token">Todoist API Token:</label>
            <input
              type="password"
              id="token"
              value={token}
              onChange={handleTokenChange}
              placeholder="Enter your Todoist API token"
              disabled={loading}
              required
            />
          </div>
          
          {error && (
            <div className="error-message">
              <span className="error-icon">❌</span>
              {error}
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={loading || !token.trim()}
            className="auth-button"
          >
            {loading ? 'Connecting...' : 'Connect to Todoist'}
          </button>
        </form>

        <div className="auth-help">
          <button 
            type="button"
            onClick={() => setShowInstructions(!showInstructions)}
            className="help-toggle"
          >
            {showInstructions ? 'Hide' : 'Show'} Instructions
          </button>
          
          {showInstructions && (
            <div className="instructions">
              <h3>How to get your Todoist API token:</h3>
              <ol>
                <li>Go to <a href="https://todoist.com/prefs/integrations" target="_blank" rel="noopener noreferrer">Todoist Settings → Integrations</a></li>
                <li>Scroll down to the "API token" section</li>
                <li>Copy your API token</li>
                <li>Paste it in the field above</li>
              </ol>
              <p className="note">
                <strong>Note:</strong> Your API token is like a password. Keep it secure and don't share it with others.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
