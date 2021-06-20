import Header from './components/Header';
import TaskList from './components/TaskList';
import AddForm from './components/AddForm';
import About from './components/About';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  const [showTaskForm, setShowTaskForm] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }

    getTasks();
  }, []);

  // fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();

    return data;
  };

  // fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  // add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTasks([...tasks, data]);
  };

  // delete Task
  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    });

    res.status === 200 ?
      setTasks(tasks.filter(task => task.id !== id)) :
      alert('Error when deleting task!');
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(tasks.map(task => task.id === id ? { ...task, reminder: data.reminder } : task));
  }

  return (
    <Router>
      <div className="container">
        <Header showAdd={showTaskForm} onAdd={() => setShowTaskForm(!showTaskForm)} />
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {!showTaskForm && <AddForm onAdd={addTask} />}
              {tasks.length > 0 ? (
                <TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
              ) : (
                'No task to show.'
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
