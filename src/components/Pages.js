import React from 'react'

function Pages({currentPage, handleNext, handlePrev, pageNumbers}) {
    return (
        <div>
            <ul className="page-numbers">
				<li id={currentPage} onClick={handlePrev}>
					Prev
				</li>
				<li className="current-page">{currentPage}</li>
				<li>of {pageNumbers.length}</li>
				<li id={currentPage} onClick={handleNext}>
					Next
				</li>
			</ul>
        </div>
    )
}

export default Pages
