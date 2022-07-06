import React, { useState } from "react";

function NewPlantForm( {setPlants} ) {
  const initialNewPlant = {
    name: "",
    image: "",
    price: 0
  }

  const [newPlant, setNewPlant] = useState(initialNewPlant)
  console.log(newPlant)


  function handleChange(event) {
    setNewPlant((currentNewPlantState) => ({
      ...currentNewPlantState, 
      [event.target.name]: event.target.value}))
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPlant)
    })
    .then((res) => res.json())
    .then((data) => setPlants((currentPlants) => [...currentPlants, data]))
    setNewPlant(initialNewPlant) 
  }

  

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input 
        type="text" 
        name="name" 
        placeholder="Plant name" 
        value={newPlant.name}
        onChange={handleChange}
        />
        <input 
        type="text" 
        name="image" 
        placeholder="Image URL" 
        value={newPlant.image}
        onChange={handleChange}
        />
        <input 
        type="number" 
        name="price" 
        step="0.01" 
        placeholder="Price" 
        value={newPlant.price}
        onChange={handleChange}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
