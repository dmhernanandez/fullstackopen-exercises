const Notification = ({ message, type }) => {

    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderColor: 'red',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderColor: 'green',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (message === null) {
        return null
    }
    
    const style = type === 'error' ? errorStyle : successStyle; 
    return (
        <div style = {style} >
           {message}
        </div>

    )

}

export default Notification