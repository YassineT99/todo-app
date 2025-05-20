import React from 'react';
import TaskList from '../../components/tasklist/tasklist';
import './TodoPage.css'

export default function ToDoPage() {
  return (
    <div className="todo-page">
      <TaskList />
    </div>
  );
}