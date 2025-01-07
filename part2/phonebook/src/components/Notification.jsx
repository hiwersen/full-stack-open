const Notification = ({ notification }) =>  
    notification && 
    <p className={`notification ${notification[1]}`}>
        {notification[0]}
    </p>

export default Notification