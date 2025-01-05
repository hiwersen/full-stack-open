import Input from "./Input.jsx"

const PersonForm = ({ onSubmit, inputs }) => (
    <form onSubmit={onSubmit}>
        {
            inputs.map(input => 
                <Input key={input.label} input={input}/>
            )
        }
        <div>
        <button type="submit">add</button>
        </div>
    </form>
  )


export default PersonForm