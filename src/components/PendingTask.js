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
      <p>{form.editText}</p> :
      <input name="editText" id="editText" type="text" value={form.editText} onChange={handleChange}/>
      }

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
  );
};

export default PendingTask;