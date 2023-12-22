function Task(props) {
  const styles = props.done ? {backgroundColor: "green"} : {backgroundColor: "white"};
  return (
    <div>
      <div>
        <p>
          {props.text}
        </p>
      </div>
      <button onClick={() => {props.deleteTask(props.taskId)}}>Delete</button>
      <button style={styles} onClick={() => {props.toggleDone(props.taskId)}}>Done</button>
    </div>
  );
};

export default Task;