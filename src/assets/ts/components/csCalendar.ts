export class csCalendar {
	private currentMonthOffset = 0;
	private monthNames = [
		"Januari",
		"Februari",
		"Maart",
		"April",
		"Mei",
		"Juni",
		"Juli",
		"Augustus",
		"September",
		"Oktober",
		"November",
		"December"
	];

	public init(): void {
		this.generateTable(this.currentMonthOffset);
		this.setMonthButtons();
	}

	private setMonthButtonsText(): void {
		const today = new Date();

		const prevMonth = <HTMLDivElement>document.querySelector(".cs-pager.cs-pager-prev-month");
		const nextMonth = <HTMLDivElement>document.querySelector(".cs-pager.cs-pager-next-month");

		const spanPrev = <HTMLSpanElement>prevMonth.querySelector(".cs-pager-text");
		spanPrev.textContent = this.monthNames[today.getMonth() + this.currentMonthOffset - 1];

		const spanNext = <HTMLSpanElement>nextMonth.querySelector(".cs-pager-text");
		spanNext.textContent = this.monthNames[today.getMonth() + this.currentMonthOffset + 1];
	}

	private setMonthButtons(): void {
		const prevMonth = document.querySelector(".cs-pager.cs-pager-prev-month");
		const nextMonth = document.querySelector(".cs-pager.cs-pager-next-month");

		prevMonth?.addEventListener("click", () => {
			this.currentMonthOffset--;
			this.generateTable(this.currentMonthOffset);
		});

		nextMonth?.addEventListener("click", () => {
			this.currentMonthOffset++;
			this.generateTable(this.currentMonthOffset);
		});
	}

	private generateTable(monthOffset: number): void {
		this.setMonthButtonsText();

		const container = document.getElementById("csCalendar") as HTMLElement;
		if (!container) return;

		container.innerHTML = ""; // Clear previous calendar

		const table = document.createElement("table");
		table.classList.add("cs-calendar-table");

		const caption = document.createElement("caption");
		caption.id = "month-title";
		caption.classList.add("cs-table-caption");

		const thead = document.createElement("thead");
		const headerRow = document.createElement("tr");
		headerRow.id = "header-row";
		thead.appendChild(headerRow);

		const tbody = document.createElement("tbody");
		tbody.id = "calendar-body";
		tbody.classList.add("cs-calendar-body");

		table.appendChild(caption);
		table.appendChild(thead);
		table.appendChild(tbody);
		container.appendChild(table);

		const today = new Date();
		today.setMonth(today.getMonth() + monthOffset);
		today.setDate(1);

		const year = today.getFullYear();
		const month = today.getMonth();
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		const firstDayOfMonth = new Date(year, month, 1).getDay();

		caption.textContent = `${this.monthNames[month]} ${year}`;

		const daysOfWeek = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"];
		daysOfWeek.forEach((day) => {
			const th = document.createElement("th");
			th.classList.add("cs-table-header-cell");
			th.textContent = day;
			headerRow.appendChild(th);
		});

		let row = document.createElement("tr");
		tbody.appendChild(row);

		for (let i = 0; i < (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); i++) {
			row.appendChild(document.createElement("td"));
		}

		for (let day = 1; day <= daysInMonth; day++) {
			if (row.children.length === 7) {
				row = document.createElement("tr");
				tbody.appendChild(row);
			}

			const td = document.createElement("td");
			td.classList.add("cs-table-content-cell");
			td.appendChild(this.addCellContents(day));
			row.appendChild(td);
		}

		while (row.children.length < 7) {
			row.appendChild(document.createElement("td"));
		}
	}

	private addCellContents(day: number): HTMLDivElement {
		const container = document.createElement("div");
		container.classList.add("cs-cell-container");

		const topRow = document.createElement("div");
		topRow.classList.add("cs-cell-top-row");

		const dayNumber = document.createElement("span");
		dayNumber.classList.add("cs-cell-day-number");
		dayNumber.textContent = day.toString();

		const addButton = document.createElement("span");
		addButton.classList.add("cs-cell-add-button", "material-symbols-outlined");
		addButton.textContent = "add";

		topRow.appendChild(dayNumber);
		topRow.appendChild(addButton);

		const contentContainer = document.createElement("div");
		contentContainer.classList.add("cs-cell-content-container");

		container.appendChild(topRow);
		container.appendChild(contentContainer);

		return container;
	}
}
