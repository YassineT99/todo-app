import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import todoistApi from '../services/todoistApi';

/**
 * TodoContext - Replaces GlobalState with Todoist API integration
 * 
 * This context manages tasks using the Todoist API instead of local state.
 * It provides the same interface as the original GlobalState but with
 * persistent storage via the Todoist API.
 */

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [inputIndex, setInputIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);  const [isAuthenticated, setIsAuthenticated] = useState(true); // Always authenticated
  /**
   * Load tasks from Todoist API
   */
  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const apiTasks = await todoistApi.getTasks();
      setTasks(apiTasks);
      // Keep input at the bottom after loading
      setInputIndex(apiTasks.length);
    } catch (err) {
      setError(`Failed to load tasks: ${err.message}`);
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  }, []);
  // Auto-authenticate with environment token on mount
  useEffect(() => {
    const token = process.env.REACT_APP_TODOIST_TOKEN;
    if (token) {
      console.log('Auto-authenticating with environment token...');
      todoistApi.setApiToken(token);
      setIsAuthenticated(true);
      loadTasks();
    } else {
      console.warn('No REACT_APP_TODOIST_TOKEN found in environment variables');
    }
  }, [loadTasks]);
  /**
   * Add a new task at the end of the list (consistent with API ordering)
   */
  const addTask = useCallback(async (text) => {
    try {
      setLoading(true);
      setError(null);
      
      // Add task via API
      const newTask = await todoistApi.addTask(text);
      
      // Simply append to the end (consistent with how API returns tasks)
      setTasks(prevTasks => [...prevTasks, newTask]);
      
      // Keep input at the end
      setInputIndex(prev => prev + 1);
      
      return newTask;
    } catch (err) {
      setError(`Failed to add task: ${err.message}`);
      console.error('Error adding task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Toggle a task's completion status
   */
  const toggleTask = useCallback(async (taskId) => {
    try {
      setError(null);
      
      // Find the current task
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;
      
      // Optimistically update UI
      setTasks(prevTasks => 
        prevTasks.map(t => 
          t.id === taskId ? { ...t, completed: !t.completed } : t
        )
      );
      
      // Update via API
      await todoistApi.toggleTask(taskId, !task.completed);
      
    } catch (err) {
      setError(`Failed to toggle task: ${err.message}`);
      console.error('Error toggling task:', err);
      
      // Revert optimistic update on error
      setTasks(prevTasks => 
        prevTasks.map(t => 
          t.id === taskId ? { ...t, completed: !t.completed } : t
        )
      );
    }
  }, [tasks]);

  /**
   * Edit a task's text
   */  const editTask = useCallback(async (taskId, newText) => {
    // Store original tasks for potential rollback
    const originalTasks = tasks;
    
    try {
      setError(null);
      
      // Optimistically update UI
      setTasks(prevTasks => 
        prevTasks.map(t => 
          t.id === taskId ? { ...t, text: newText } : t
        )
      );
      
      // Update via API
      await todoistApi.updateTask(taskId, newText);
      
    } catch (err) {
      setError(`Failed to edit task: ${err.message}`);
      console.error('Error editing task:', err);
      
      // Revert optimistic update on error
      setTasks(originalTasks);
    }
  }, [tasks]);

  /**
   * Delete a task
   */  const deleteTask = useCallback(async (taskId) => {
    // Store original tasks for potential rollback
    const originalTasks = tasks;
    
    try {
      setError(null);
      
      // Optimistically update UI
      const updatedTasks = tasks.filter(t => t.id !== taskId);
      setTasks(updatedTasks);
      
      // Adjust inputIndex if needed
      const newInputIndex = inputIndex > updatedTasks.length ? updatedTasks.length : inputIndex;
      setInputIndex(newInputIndex);
      
      // Delete via API
      await todoistApi.deleteTask(taskId);
      
    } catch (err) {
      setError(`Failed to delete task: ${err.message}`);
      console.error('Error deleting task:', err);
      
      // Revert optimistic update on error
      setTasks(originalTasks);
    }
  }, [tasks, inputIndex]);

  /**
   * Authenticate with Todoist
   */
  const authenticate = useCallback(async (token) => {
    try {
      setLoading(true);
      setError(null);
      
      todoistApi.setApiToken(token);
      
      // Test the connection
      const testResult = await todoistApi.testConnection();
      if (testResult.success) {
        setIsAuthenticated(true);
        await loadTasks();
        return { success: true, message: testResult.message };
      } else {
        throw new Error(testResult.message);
      }
    } catch (err) {
      setError(`Authentication failed: ${err.message}`);
      setIsAuthenticated(false);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }, [loadTasks]);

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Refresh tasks from API
   */
  const refreshTasks = useCallback(async () => {
    if (isAuthenticated) {
      await loadTasks();
    }
  }, [isAuthenticated, loadTasks]);

  const value = {
    // State
    tasks,
    inputIndex,
    loading,
    error,
    isAuthenticated,
    
    // Actions
    addTask,
    toggleTask,
    editTask,
    deleteTask,
    authenticate,
    clearError,
    refreshTasks,
    
    // Utility functions for backward compatibility
    setInputIndex,
    
    // Legacy support - for components that still expect global state format
    setGlobalState: (data) => {
      if (data.tasks !== undefined) setTasks(data.tasks);
      if (data.inputIndex !== undefined) setInputIndex(data.inputIndex);
    }
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook for using the TodoContext
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};

// For backward compatibility with existing useGlobalState usage
export const useGlobalState = () => {
  const context = useTodo();
  return {
    tasks: context.tasks,
    inputIndex: context.inputIndex,
    loading: context.loading,
    error: context.error,
    isAuthenticated: context.isAuthenticated,
  };
};

export default TodoContext;
