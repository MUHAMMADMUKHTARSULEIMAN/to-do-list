function AddTask(props) {
  return (
    <div>
      <form>
        <input id="left" type="text" value={props.text} name="taskText" onChange={props.handleChange}/>
        <button onClick={props.addTask}>Add task</button>
      </form>
    </div>
  );
};

export default AddTask;