# Todo App

A modern, interactive todo list app built with React.  
Add, complete, edit, and manage your tasks in a Trello-like interface where the input bar moves down as you add new tasks.

---

## Features

- Add, edit, complete, and delete tasks
- Input bar moves down as you add tasks (Trello-style)
- Edit tasks inline with a pencil icon
- Persistent state across navigation
- Responsive, clean UI
- Smooth GSAP animations for UI elements

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
   This will install all required packages.

2. **Run the app:**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Dependencies

- **react** (UI library)
- **react-dom** (DOM bindings for React)
- **gsap** (GreenSock Animation Platform, for UI animations)

---

## Project Structure

```
src/
  components/
    tasklist/
      tasklist.js
      taskinput.js
      taskitem.js
  pages/
    ToDoPage/
      TodoPage.js
      ToDoPage.css
    HomePage/
      HomePage.js
      HomePage.css
  GlobalState.jsx
  App.js
```

---

## License

MIT

---

**Created by Yassine Toumi**
