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
    }
    case "done": {
      const toggle = draft.find(t => t.id === action.id)
      toggle.done = !toggle.done
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

  const toggleDone = (done) => {
    dispatch({
      type: "done",
      id: taskId
    })
  }

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
