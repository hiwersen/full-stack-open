const Person = ({ person: { name, number }, onClick}) => (
    <p>{name} {number}&nbsp; 
        <button type='button' onClick={onClick}>delete</button>
    </p>
) 

export default Person