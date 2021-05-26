import React from 'react'

function Heading({header, templates}) {
    return (
        <div className="template-heading">
            <h2>{header} Templates</h2>
				<p>{templates.length}</p>
        </div>
    )
}

export default Heading
