import React from "react";

function Suggestion({ display, list, currentTemplate, displayList }) {
	return (
		<div>
			{display && list ? (
				<ul className="topic-list">
					{currentTemplate.map((template) => (
						<li onClick={displayList}>{template.name}</li>
					))}
				</ul>
			) : (
				""
			)}
		</div>
	);
}

export default Suggestion;
