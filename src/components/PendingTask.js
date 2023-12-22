import { useState } from "react";
function PendingTask(props) {
  const [form, setForm] = useState({
    editText: props.text
  });

  const handleChange = (e) => {
    const {name, value} = e.target;

    setForm(prevForm => {
      return {
        ...prevForm,
        [name]: value
      }
    })
  };

  return (
    <div>
      {!props.edit ?
      <div><p>{form.editText}</p></div> :
      <div><input name="editText" id="editText" type="text" value={form.editText} onChange={handleChange}/></div>
      }

      <div>
        {props.done ?
        "" :
        <button onClick={() => {props.editTask(props.taskId)}}>{props.edit ? "Save" : "Edit"}</button>
        }
        {props.edit ?
        "" :
          <button onClick={() => {props.deleteTask(props.taskId)}}>Delete</button>
        }
        {props.edit ?
        "" :
          <button onClick={() => {props.toggleDone(props.taskId)}}>{props.done ? "Resume" : "Done"}</button>
        }
      </div>

      {props.done ?
      <div>
        <h3>Completed</h3>
      </div> :
      ""
      }
    </div>
  );
};

export default PendingTask;