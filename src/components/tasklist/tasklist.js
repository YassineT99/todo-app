import React from 'react';
import TaskItem from './taskitem';
import TaskInput from './taskinput';
import { useTodo } from '../../contexts/TodoContext';

/*
  TaskList component:
  - Manages the list of tasks and the position of the input bar.
  - Handles adding, toggling, editing, and deleting tasks using Todoist API.
  - Uses TodoContext for tasks and input position.
*/
export default function TaskList() {  // Get the current list of tasks and the input bar position from TodoContext
  const { 
    tasks = [], 
    inputIndex = 0, 
    addTask, 
    toggleTask, 
    deleteTask, 
    editTask,
    loading
  } = useTodo();

  // Handler for adding a new task at the current input position
  const handleAddTask = async (text) => {
    try {
      await addTask(text);
    } catch (error) {
      // Error handling is done in the context, just log here
      console.error('Failed to add task:', error);
    }
  };

  // Handler for toggling a task's completion status
  const handleToggleTask = async (id) => {
    try {
      await toggleTask(id);
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };

  // Handler for deleting a task
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  // Handler for editing a task's text
  const handleEditTask = async (id, newText) => {
    try {
      await editTask(id, newText);
    } catch (error) {
      console.error('Failed to edit task:', error);
    }  };

  // Build the list of rows (TaskInput and TaskItem components)
  // The input bar appears at the current inputIndex position
  const rows = [];
  for (let i = 0; i <= tasks.length; i++) {
    if (i === inputIndex) {
      // Render the input bar at the current inputIndex
      rows.push(
        <TaskInput 
          key="input" 
          onAdd={handleAddTask} 
          disabled={loading}
        />
      );
    }
    if (i < tasks.length) {
      // Render each task item
      rows.push(
        <TaskItem
          key={tasks[i].id}
          task={tasks[i]}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
          disabled={loading}
        />
      );
    }
  }

  // Render the todo list as a styled card with a scrollable list of tasks
  return (
    <div className="todo-list">      <div className="todo-list-topbar">
        Task List
        {loading && <span className="loading-indicator"><div className="spinner"></div></span>}
      </div>
      <div className="todo-list-content">
        <ul>
          {/* Render each row (either a TaskInput or TaskItem) inside a list item */}
          {rows.map((row, idx) => (
            <li key={row.key || idx}>{row}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}