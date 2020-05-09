import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState({
    name: 'pankaj',
    age: 12,
    city: 'alwar',
  });
  const [data, updateData] = useState([
    { id: 1, name: 'Pankaj 1' },
    { id: 2, name: 'Pankaj 2' },
    { id: 3, name: 'Pankaj 3' },
    { id: 4, name: 'Pankaj 4' },
  ]);

  const updateStateData = (id) => {
    let item = data.find((item) => item.id == id);
    item.name += ' updated 1';
    // alert(JSON.stringify(data));
    updateData(data);
  };

  return (
    <div>
      <p>You clicked {count.name} name</p>
      <p>You clicked {count.age} age</p>
      <p>You clicked {count.city} city</p>
      <button
        onClick={() =>
          setCount({
            name: count.name + ' updated',
            age: count.age,
            city: count.city,
          })
        }>
        Update Name
      </button>
      <button
        onClick={() =>
          setCount({ name: count.name, age: count.age + 10, city: count.city })
        }>
        Update Age
      </button>
      <button
        onClick={() =>
          setCount({
            name: count.name,
            age: count.age,
            city: count.city + ' updated',
          })
        }>
        Update City
      </button>

      <div>
        {data.map((item) => {
          console.log({ item });
          return (
            <div>
              <p>{item.id}</p>
              <p>{item.name}</p>
              <button onClick={() => updateStateData(item.id)}>Update</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Example;
