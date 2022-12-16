const PersonForm = ({name, phone, onChangeName, onChangePhone, onSubmit}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>name: <input value={name} onChange={onChangeName}/></div>
      <div>number: <input value={phone} onChange={onChangePhone}/></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm;