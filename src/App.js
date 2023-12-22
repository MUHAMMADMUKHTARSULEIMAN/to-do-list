import {useState} from "react";
import {useImmerReducer} from "use-immer";
import AddTask from "./components/AddTask";
import Task from "./components/Task";

let setId = 0;
const initialTasks = [];


function taskReducer(draft, action) {
  switch(action.type) {
    case "create": {
      draft.push({
        id: action.id,
        text: action.text,
        done: false,
        edit: false
      });
      break;
    }
    case "done": {
      const toggle = draft.find(t => t.id === action.id)
      toggle.done = !toggle.done;
      break;
    }
    case "edit": {
      const toggle = draft.find(t => t.id === action.id)
      toggle.edit = !toggle.edit;
      break;
    }
    case "delete": {
      return draft.filter(t => t.id !== action.id);
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
};

function App() {
  const [tasks, dispatch] = useImmerReducer(taskReducer, initialTasks);

  const [form, setForm] = useState({
    text: ""
  });

  const handleChange = (e) => {
    const {name, value} = e.target;

    setForm(prevForm => {
      return {
        ...prevForm,
        [name]: value
      };
    });
  };

  const addTask = (e, text) => {
    e.preventDefault();

    dispatch({
      type: "create",
      id: setId++,
      text: form.text
    });

    setForm(prevForm => {
      return {
        text: ""
      };
    });
  };

  const toggleDone = taskId => {
    dispatch({
      type: "done",
      id: taskId
    })
  };

  const deleteTask = taskId => {
    dispatch({
      type: "delete",
      id: taskId
    });
  };

  const editTask = (taskId) => {
    dispatch({
      type: "edit",
      id: taskId
    });
  }

  const mappedTasks = tasks.map(task => {
    return (
      <Task
      taskId={task.id}
      text={task.text}
      editTask={editTask}
      toggleDone={toggleDone}
      deleteTask={deleteTask}
      />
    )
  })
  return (
    <div id="App">
      <AddTask
      text={form.text}
      handleChange={handleChange}
      addTask={addTask}
      />
      <div>
        {mappedTasks}
      </div>
    </div>
  );
}

export default App;
