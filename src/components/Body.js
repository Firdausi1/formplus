import React from "react";
import "./Body.css";

function Body({ title, description, link }) {
	return (
		<div className="box">
			<div className="box-text">
				<h4>{title}</h4>
				<p>{description}</p>
			</div>
			<div className="box-link">
				<a href={link}>use template</a>
			</div>
		</div>
	);
}

export default Body;
