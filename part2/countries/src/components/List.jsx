const List = ({ list }) => {
    const style = { 
        listStyle: 'none',
        padding: 0
    }

    return list.length > 1 && (
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