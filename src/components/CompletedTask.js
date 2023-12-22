function CompletedTask(props) {
  return (
    <div>
      <div>
        <p>{props.editText}</p>
      </div>

      <button onClick={() => {props.deleteTask(props.taskId)}}>Delete</button>
      <button onClick={() => {props.toggleDone(props.taskId)}}>Resume</button>
    </div>
  );
};

export default CompletedTask;