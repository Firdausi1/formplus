import React from "react";

function Dropdown({ sort, name, action }) {
	return (
		<div>
			<fieldset>
				<legend> {name} </legend>
				<select name="" onChange={action}>
                    {sort.map(sort => (
					<option value={sort}>{sort}</option>
                    ))}
				</select>
			</fieldset>
		</div>
	);
}

export default Dropdown;
