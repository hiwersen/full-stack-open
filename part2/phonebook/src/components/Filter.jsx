const Filter = ({ value, onChange }) => (
    <div>filter shown with&nbsp; 
        <input 
          type="text" 
          value={value}
          onChange={onChange}
        />
    </div>
)

export default Filter