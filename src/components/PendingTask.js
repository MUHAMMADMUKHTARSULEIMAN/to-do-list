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
      };
    });
  };

  return (
    <>
      <div id="task-container">
        {!props.edit ?
        <div id="text-container"><p>{form.editText}</p></div> :
        <div id="input-container"><input name="editText" id="edit-text" type="text" value={form.editText} onChange={handleChange}/></div>
        }
        <br/>
        <div id="buttons-container">
          {props.done ?
          "" :
          <button className="task-button" onClick={() => {props.editTask(props.taskId)}}>{props.edit ? "Save" : "Edit"}</button>
          }
          {props.edit ?
          "" :
            <button className="task-button" onClick={() => {props.deleteTask(props.taskId)}}>Delete</button>
          }
          {props.edit ?
          "" :
            <button className="task-button" onClick={() => {props.toggleDone(props.taskId)}}>{props.done ? "Resume" : "Done"}</button>
          }
        </div>
        <br/>
        <div id="created-completed">
          <p>Created: {props.date}</p>
          {props.done ?
          <div id="completed-indicator">
            <p id="completed">Completed</p>
          </div> :
          ""
          }        
        </div>
      </div>
      <hr/>
    </>
  );
};

export default PendingTask;