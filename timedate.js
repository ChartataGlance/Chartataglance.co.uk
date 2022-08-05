/** @format */

const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");

/**
 * @param {Date} date
 */
function formateTime(date) {
	const hours12 = date.getHours() % 12 || 12;
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	const isAm = date.getHours() < 12;

	return `${hours12.toString().padStart(2, "0")}:
	        ${minutes.toString().padStart(2, "0")} 
			  ${seconds.toString().padStart(2, "0")}
			  ${isAm ? "AM," : "PM,"}`;
}

/**
 * @param {Date} date
 */

function formateDate(date) {
	const DAYS = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const MONTHS = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"Septembar",
		"Octobar",
		"November",
		"December",
	];

	return ` ${DAYS[date.getDay()]}, 
	         ${MONTHS[date.getMonth()]}
				${date.getDate()}  
	         ${date.getFullYear()}`;
}

setInterval(() => {
	const now = new Date();
	timeElement.textContent = formateTime(now);
	dateElement.textContent = formateDate(now);
}, 10);
