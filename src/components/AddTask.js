function AddTask(props) {
  return (
    <div>
      <form>
        <input name="text" id="text" type="text" value={props.text} onChange={props.handleChange}/>
        <button onClick={props.addTask}>Add task</button>
      </form>
    </div>
  );
};

export default AddTask;