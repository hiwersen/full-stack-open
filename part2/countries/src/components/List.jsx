const List = ({ list }) => {
    if (!list.length) return null
    
    const style = { 
        listStyle: 'none',
        padding: 0
    }

    return (
        <ul style={style}>
            {
                list.map(name => 
                    <li key={name}>{name}</li>
                )
            }
        </ul>
    )
}

export default List