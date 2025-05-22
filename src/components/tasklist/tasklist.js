import React from 'react';
import TaskItem from './taskitem';
import TaskInput from './taskinput';
import { useGlobalState } from '../../GlobalState';

/*
  TaskList component:
  - Manages the list of tasks and the position of the input bar.
  - Handles adding, toggling, editing, and deleting tasks.
  - Uses global state for tasks and input position.
*/
export default function TaskList() {
  // Get the current list of tasks and the input bar position from global state
  const { tasks = [], inputIndex = 0 } = useGlobalState();

  // Handler for adding a new task at the current input position
  const handleAddTask = (text) => {
    const newTask = {
      id: Date.now(),      // Unique ID based on timestamp
      text,                // Task text from input
      completed: false     // New tasks start as not completed
    };
    // Insert the new task at the inputIndex position
    const updatedTasks = [
      ...tasks.slice(0, inputIndex),
      newTask,
      ...tasks.slice(inputIndex)
    ];
    // Update global state: add new task and move input down one row
    window.GlobalState.set({
      tasks: updatedTasks,
      inputIndex: inputIndex + 1 // Move input down one row
    });
  };

  // Handler for toggling a task's completion status
  const handleToggleTask = (id) => {
    // Flip the 'completed' property for the clicked task
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    // Update global state with the new tasks array
    window.GlobalState.set({ tasks: updatedTasks });
  };

  // Handler for deleting a task
  const handleDeleteTask = (id) => {
    // Remove the task with the given id
    const updatedTasks = tasks.filter(task => task.id !== id);
    // Adjust inputIndex if needed (so input doesn't go out of bounds)
    const newInputIndex = inputIndex > updatedTasks.length ? updatedTasks.length : inputIndex;
    window.GlobalState.set({ tasks: updatedTasks, inputIndex: newInputIndex });
  };

  // Handler for editing a task's text
  const handleEditTask = (id, newText) => {
    // Update the text of the task with the given id
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    );
    window.GlobalState.set({ tasks: updatedTasks });
  };

  // Build the list of rows (TaskInput and TaskItem components)
  // The input bar appears at the current inputIndex position
  const rows = [];
  for (let i = 0; i <= tasks.length; i++) {
    if (i === inputIndex) {
      // Render the input bar at the current inputIndex
      rows.push(
        <TaskInput key="input" onAdd={handleAddTask} />
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
          onEdit={handleEditTask} // Pass edit handler
        />
      );
    }
  }

  // Render the todo list as a styled card with a scrollable list of tasks
  return (
    <div className="todo-list">
      <div className="todo-list-topbar">
        Task List
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