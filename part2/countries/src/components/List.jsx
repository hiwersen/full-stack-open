const List = ({ list, onClick }) => {
    const style = { 
        listStyle: 'none',
        padding: 0
    }

    return list.length > 1 && (
        <ul style={style}>
            {
                list.map(name => 
                    <li key={name}>{name}
                        <button 
                            type="button"
                            value={name}
                            onClick={onClick}
                        >show</button>
                    </li>
                )
            }
        </ul>
    )
}

export default List