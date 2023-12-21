import {useImmerReducer} from "use-immer";
import AddTask from "./components/AddTask";
import Task from "./components/Task";

let taskId = 0;
const initialTasks = [];


function taskReducer(draft, action) {
  switch(action.type) {
    case "create": {
      draft.push({
        id: action.id,
        text: action.text,
        done: false
      });
      break;
    }
    case "done": {
      const toggle = draft.find(t => t.id === action.id)
      toggle.done = !toggle.done;
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

  const handleAddTask = text => {
    taskId++;

    dispatch({
      type: "added",
      id: taskId,
      text: text
    })
  };

  const toggleDone = taskId => {
    dispatch({
      type: "done",
      id: taskId
    })
  };

  const handleDeleteTask = taskId => {
    dispatch({
      type: "delete",
      id: taskId
    })
  }

  const mappedTasks = tasks.map(task => {
    return (
      <Task
      id={task.id}
      text={task.text}
      toggleDone={toggleDone}
      handleDeleteTask={handleDeleteTask}
      />
    )
  })
  return (
    <div id="App">
      <AddTask
      handleAddTask={handleAddTask}
      />
      <div>
        {mappedTasks}
      </div>
    </div>
  );
}

export default App;
