import {useState} from "react";
import {useImmerReducer} from "use-immer";
import AddTask from "./components/AddTask";
import PendingTask from "./components/PendingTask";
// import CompletedTask from "./components/CompletedTask";

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

// const initialTextForm = {
//   text: ""
// };



// function formReducer(textForm, action) {
//   switch(action.type) {
//     case "handle text input": {
//       return ({
//                 ...textForm,
//         [action.field]: action.payload
//       });
//     }
//     default: {
//       throw Error(`Unknown action: ${action.type}`)
//     }
//   }
// };

function App() {
  const [tasks, dispatch] = useImmerReducer(taskReducer, initialTasks);

  const [form, setForm] = useState({
    text: "",
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

  // const [editForm, setEditForm] = useState({
  //   editText: form.text
  // });

  // const handleEditChange = (e) => {
  //   const {name, value} = e.target;

  //   setEditForm(prevForm => {
  //     return {
  //       ...prevForm,
  //       [name]: value
  //     };
  //   });
  // };

  const addTask = (e) => {
    e.preventDefault();

    dispatch({
      type: "create",
      id: setId++,
      text: form.text
    });

    setForm(prevForm => {
      return {
        ...prevForm,
        text: "",
      };
    });
  };

  const toggleDone = (taskId) => {
    dispatch({
      type: "done",
      id: taskId
    });
  };

  const deleteTask = (taskId) => {
    const answer = window.confirm('Do you want to proceed with this action?');
    if(answer) {
      dispatch({
        type: "delete",
        id: taskId
      });
    };
  };

  const editTask = (taskId) => {
    dispatch({
      type: "edit",
      id: taskId
    });
  };

  const allTasks = tasks.map(task => {
    return (
      <PendingTask
      key={task.id}
      taskId={task.id}
      text={task.text}
      done={task.done}
      edit={task.edit}
      editTask={editTask}
      toggleDone={toggleDone}
      deleteTask={deleteTask}
      />
    );
  });

  const pendingTasks = tasks.filter(t => !t.done).map(task => {
    return (
      <PendingTask
      taskId={task.id}
      text={task.text}
      done={task.done}
      edit={task.edit}
      editTask={editTask}
      toggleDone={toggleDone}
      deleteTask={deleteTask}
      />
    );
  });

  const completedTasks = tasks.filter(t => t.done).map(task => {
    return (
      <PendingTask
      taskId={task.id}
      text={task.text}
      done={task.done}
      edit={task.edit}
      editTask={editTask}
      toggleDone={toggleDone}
      deleteTask={deleteTask}
      />
    );
  });

  return (
    <div id="App">
      <AddTask
      text={form.text}
      handleChange={handleChange}
      addTask={addTask}
      />

      <div>
        {allTasks}
      </div>

      <div>
        <h1>Pending</h1>
        {pendingTasks}
      </div>

      <div>
        <h1>Completed</h1>
        {completedTasks}
      </div>
    </div>
  );
}

export default App;
