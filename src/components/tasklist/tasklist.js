import React from 'react';
import TaskItem from './taskitem';
import TaskInput from './taskinput';
import { useGlobalState } from '../../GlobalState';

// TaskList component: manages the list of tasks and the moving input bar
export default function TaskList() {
  // Get tasks and inputIndex from global state (inputIndex persists across navigation)
  const { tasks = [], inputIndex = 0 } = useGlobalState();

  // Handler for adding a new task at the current input position
  const handleAddTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false
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

  // Handler for toggling task completion
  const handleToggleTask = (id) => {
    // Toggle the completed property for the clicked task
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    // Update global state with the new tasks array
    window.GlobalState.set({ tasks: updatedTasks });
  };

  // Build the list with the input at the current inputIndex
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
        />
      );
    }
  }

  return (
    <div className="todo-list">
      <ul>
        {/* Render each row (either a TaskInput or TaskItem) inside a list item */}
        {rows.map((row, idx) => (
          <li key={row.key || idx}>{row}</li>
        ))}
      </ul>
    </div>
  );
}