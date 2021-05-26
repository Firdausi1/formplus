import React from 'react'

function Search({searchByName, value}) {
    return (
        <div className="home-searchBar">
            <input
							type="search"
							onChange={searchByName}
							className="search"
							placeholder="Search Templates"
							value={value}
						/>
						<div className="home-searchBar--icon">
							<img src="../../Group 19253search.png" alt="search"/>
						</div>
        </div>
    )
}

export default Search
