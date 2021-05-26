import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./home.css";
import Body from "./Body";
import Dropdown from "./Dropdown";
import Heading from "./Heading";
import Banner from "./Banner";
import Pages from "./Pages";
import Search from "./Search";
import Suggestion from "./Suggestion";

function Home() {
	const [templates, setTemplate] = useState([]);
	const [currentTemplate, setCurrentTemplate] = useState([]);
	const [display, setDisplay] = useState(true);
	const [list, setList] = useState(false);
	const [value, setValue] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [tempsPerPage, setTempsPerPage] = useState(15);
	const indexOfLastTemp = currentPage * tempsPerPage;
	const indexOfFirstTemp = indexOfLastTemp - tempsPerPage;
	const [header, setHeader] = useState("All");
	const [category, setCategory] = useState([
		"All",
		"E-commerce",
		"Eduction",
		"Health",
	]);
	const [sort, setSort] = useState(["Default", "Ascending", "Descending"]);

	const getTemplateData = async () => {
		const url =
			"https://front-end-task-dot-fpls-dev.uc.r.appspot.com/api/v1/public/task_templates";
		const response = await fetch(url);
		const result = await response.json();
		setTemplate(result.slice(1, 21));
		setCurrentTemplate(result.slice(indexOfFirstTemp, indexOfLastTemp));
	};

	const displayTemplate = (match) => {
		return setCurrentTemplate(match.slice(indexOfFirstTemp, indexOfLastTemp));
	};
	const filter = (searchWord, templates) => {
		return templates.filter((template) => {
			const regex = new RegExp(searchWord, "gi");
			const category = template.category.toString();
			return template.name.match(regex) || category.match(regex);
		});
	};

	const searchByName = (e) => {
		if (e.target.value === "") {
			setList(false);
		} else {
			displayTemplate(filter(e.target.value, templates));
			setList(true);
		}
		setValue(e.target.value);
	};
	const displayList = (e) => {
		displayTemplate(filter(e.target.innerText, templates));
		setValue(e.target.innerText);
		setList(false);
	};
	const sortByCategory = (e) => {
		if (e.target.value === "All") {
			displayTemplate(templates);
		} else {
			displayTemplate(filter(e.target.value, templates));
		}
		setList(false);
		setDisplay(true);
		setHeader(e.target.value);
	};
	const sortByName = (e) => {
		if (e.target.value === "Ascending") {
			const ascending = templates.sort((a, b) => {
				const first = a.name.toLowerCase();
				const second = b.name.toLowerCase();
				return first > second ? 1 : -1;
			});
			displayTemplate(ascending);
		} else if (e.target.value === "Descending") {
			const desc = templates.sort((a, b) => {
				const first = a.name.toLowerCase();
				const second = b.name.toLowerCase();
				return first < second ? 1 : -1;
			});
			displayTemplate(desc);
		} else{
			displayTemplate(templates);
		}
	};
	const sortByDate = (e) => {
		if (e.target.value === "Ascending") {
			const ascending = templates.sort((a, b) =>
				a.created > b.created ? 1 : -1
			);
			displayTemplate(ascending);
		} else if (e.target.value === "Descending") {
			const desc = templates.sort((a, b) => (a.created < b.created ? 1 : -1));
			displayTemplate(desc);
		} else{
			displayTemplate(templates);
		}
	};
	const handleNext = (e) => {
		const next = Number(e.target.id) + 1;
		setCurrentPage(next);
	};
	const handlePrev = (e) => {
		const prev = Number(e.target.id) - 1;
		setCurrentPage(prev);
	};
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(templates.length / tempsPerPage); i++) {
		pageNumbers.push(i);
	}

	useEffect(() => {
		getTemplateData();
	}, []);
	useEffect(() => {
		displayTemplate(templates);
	}, [currentPage]);

	return (
		<div className="home">
			<div className="home-search">
				<div className="home-list">
					<Search searchByName={searchByName} value={value}/>
					<Suggestion display={display} list={list} currentTemplate={currentTemplate} displayList={displayList}/>
				</div>
				<div className="home-filter">
					<h3>Sort By:</h3>
					<div className="filters">
						<Dropdown sort={category} name="Category" action={sortByCategory} />
						<Dropdown sort={sort} name="Order" action={sortByName} />
						<Dropdown sort={sort} name="Date" action={sortByDate} />
					</div>
				</div>
			</div>
			<Banner/>
			<Heading header={header} templates={templates}/>
			<div className="body">
				{" "}
				{currentTemplate.map((template) => (
					<Body
						title={template.name}
						description={template.description}
						link={template.link}
					/>
				))}
			</div>
			<Pages handleNext={handleNext} handlePrev={handlePrev} currentPage={currentPage} pageNumbers={pageNumbers}/>
		</div>
	);
}

export default Home;
