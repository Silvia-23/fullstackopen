const AddNewPersonForm = ({ onSubmit, nameInput, onNameChange, numberInput, onNumberChange }) => (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={nameInput} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={numberInput} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )

  export default AddNewPersonForm