import React, { useState } from 'react';

function Todos({ text, index, addTodo, markComplete, deleteTodo }) {
  const [state, setstate] = useState();

  const hitState = () => {
    setstate(state + 1);
    markComplete(index);
    // const newstate = [...state, 3];
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (state) {
      setstate(state);
      addTodo(state);
      setstate('');
    }
  };
  const onDelete = (e) => {
    deleteTodo(index);
  };
  return (
    <div>
      {/* { (e) => setstate(state + 1)} */}
      {/* <h1 onClick={hitState}> */}
      <h6>Just Todos {text}</h6>
      <form onSubmit={onSubmit}>
        <input
          name={state}
          value={state}
          onChange={(e) => setstate(e.target.value)}></input>
      </form>
      <button onClick={onDelete}>x remove</button>

      {/* <button onClick={hitState}>hit {text} </button> */}
    </div>
  );
}

export default Todos;
