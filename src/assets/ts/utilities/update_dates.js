import fs from 'fs/promises';

function formatDate(date) {
	const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	const weekday = weekdays[date.getUTCDay()];
	const month = months[date.getUTCMonth()];
	const day = String(date.getUTCDate()).padStart(2, '0');
	const year = date.getUTCFullYear();

	return `${weekday} ${month} ${day} ${year}`;
}

function updateDatesToCurrentMonth(data) {
	const now = new Date();
	const currentYear = now.getFullYear();
	const currentMonth = now.getMonth();

	for (const key in data) {
		if (data[key].date) {
			try {
				const originalDate = new Date(data[key].date);
				let newDay = originalDate.getDate();

				const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
				if (newDay > lastDayOfMonth) {
					newDay = lastDayOfMonth;
				}

				const newDate = new Date(Date.UTC(currentYear, currentMonth, newDay));
				data[key].date = formatDate(newDate);
			} catch (err) {
				console.error(`Error processing ${key}: ${err}`);
			}
		}
	}
	return data;
}

async function processJson() {
	const jsonString = await fs.readFile('testdata.json', 'utf8');
	const jsonData = JSON.parse(jsonString);

	const updatedData = updateDatesToCurrentMonth(jsonData);

	await fs.writeFile('output.json', JSON.stringify(updatedData, null, 4));
	console.log("Dates updated.");
}

processJson();
