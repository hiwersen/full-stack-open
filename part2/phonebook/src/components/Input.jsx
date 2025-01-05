const Input = ({ input: { 
    label, 
    type, 
    value,
    onChange 
} }) => (
    <div>{label}: 
        <input 
            type={type} 
            value={value}
            onChange={onChange}
        />
    </div>
  )

export default Input