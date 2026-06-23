const Filter = ((props) => {
    return (<div>
        filter shown with: 
        <input
            onChange={props.onChange}
            placeholder='search'
        />
    </div>)
}
)
export default Filter