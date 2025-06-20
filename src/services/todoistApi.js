/**
 * Todoist API Service
 * 
 * This service handles all interactions with the Todoist API.
 * It provides methods for CRUD operations on tasks and handles
 * authentication, error handling, and data transformation.
 */

const TODOIST_API_BASE = 'https://api.todoist.com/rest/v2';

class TodoistApiService {
  constructor() {
    // In a real app, you'd get this from environment variables or user login
    // For development, you can get a token from: https://todoist.com/prefs/integrations
    this.apiToken = process.env.REACT_APP_TODOIST_TOKEN || localStorage.getItem('todoistToken');
    this.projectId = null; // Will be set when we create/get a project
  }

  /**
   * Set the API token (for authentication)
   */
  setApiToken(token) {
    this.apiToken = token;
    localStorage.setItem('todoistToken', token);
  }

  /**
   * Get headers for API requests
   */
  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiToken}`,
    };
  }

  /**
   * Generic API request handler
   */
  async makeRequest(endpoint, options = {}) {
    if (!this.apiToken) {
      throw new Error('API token not set. Please authenticate first.');
    }

    const url = `${TODOIST_API_BASE}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`);
      }

      // Handle empty responses (like from DELETE requests)
      if (response.status === 204) {
        return null;
      }

      return await response.json();
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error. Please check your internet connection.');
      }
      throw error;
    }
  }

  /**
   * Get or create a project for our todo app
   */
  async getOrCreateProject() {
    try {
      // First, get all projects
      const projects = await this.makeRequest('/projects');
      
      // Look for our app's project
      let appProject = projects.find(p => p.name === 'My Todo App');
      
      if (!appProject) {
        // Create a new project for our app
        appProject = await this.makeRequest('/projects', {
          method: 'POST',
          body: JSON.stringify({
            name: 'My Todo App',
            color: 'blue'
          })
        });
      }
      
      this.projectId = appProject.id;
      return appProject;
    } catch (error) {
      console.error('Error getting/creating project:', error);
      throw error;
    }
  }

  /**
   * Get all tasks from our project
   */
  async getTasks() {
    try {
      // Ensure we have a project
      if (!this.projectId) {
        await this.getOrCreateProject();
      }

      const tasks = await this.makeRequest(`/tasks?project_id=${this.projectId}`);
      
      // Transform Todoist tasks to our app's format
      return tasks.map(task => ({
        id: task.id,
        text: task.content,
        completed: task.is_completed,
        // Keep original todoist data for potential future use
        _todoist: task
      }));
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  /**
   * Add a new task
   */
  async addTask(text) {
    try {
      // Ensure we have a project
      if (!this.projectId) {
        await this.getOrCreateProject();
      }

      const newTask = await this.makeRequest('/tasks', {
        method: 'POST',
        body: JSON.stringify({
          content: text,
          project_id: this.projectId
        })
      });

      // Transform to our app's format
      return {
        id: newTask.id,
        text: newTask.content,
        completed: newTask.is_completed,
        _todoist: newTask
      };
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  }

  /**
   * Update a task's text
   */
  async updateTask(taskId, newText) {
    try {
      const updatedTask = await this.makeRequest(`/tasks/${taskId}`, {
        method: 'POST',
        body: JSON.stringify({
          content: newText
        })
      });

      return {
        id: updatedTask.id,
        text: updatedTask.content,
        completed: updatedTask.is_completed,
        _todoist: updatedTask
      };
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  /**
   * Toggle a task's completion status
   */
  async toggleTask(taskId, completed) {
    try {
      if (completed) {
        // Close the task
        await this.makeRequest(`/tasks/${taskId}/close`, {
          method: 'POST'
        });
      } else {
        // Reopen the task
        await this.makeRequest(`/tasks/${taskId}/reopen`, {
          method: 'POST'
        });
      }

      // Return the updated task status
      return { completed };
    } catch (error) {
      console.error('Error toggling task:', error);
      throw error;
    }
  }

  /**
   * Delete a task
   */
  async deleteTask(taskId) {
    try {
      await this.makeRequest(`/tasks/${taskId}`, {
        method: 'DELETE'
      });
      return { success: true };
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }

  /**
   * Test the API connection
   */
  async testConnection() {
    try {
      await this.makeRequest('/projects');
      return { success: true, message: 'Connected to Todoist successfully!' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

// Create and export a singleton instance
export const todoistApi = new TodoistApiService();
export default todoistApi;
