const PersonForm = ({onSubmit, newName, newNumber, setNewName, setNewNumber})=>{
    return (
        <form onSubmit={onSubmit}>
        <div>
          name: <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
          <br></br>
          Number: <input
            value={newNumber}
            onChange={(event) => setNewNumber(event.target.value)}
          />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
    )
}

export default PersonForm