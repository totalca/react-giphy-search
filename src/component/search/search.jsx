import React from 'react'

const Search = props => {
    const { searchIt } = props;
    let searchElement = '';
    return (
        <form onSubmit={e => searchIt(e, searchElement)}>
            <input 
                type="search"
                ref={element => searchElement = element}/>
            <input type="button" value="Search it!"/>
        </form>
    )
}

export default Search