export class csModal {
	private modalContainer: HTMLDivElement;
	private scrim: HTMLDivElement;
	private weekdaySpan: HTMLSpanElement;
	private dateSpan: HTMLSpanElement;
	private daysOfWeek = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"];

	constructor() {
		this.modalContainer = document.querySelector(".cs-modal") as HTMLDivElement;
		this.scrim = document.querySelector(".cs-scrim") as HTMLDivElement;
		this.weekdaySpan = this.modalContainer.querySelector(
			".cs-modal-date .cs-modal-date-weekday"
		) as HTMLSpanElement;
		this.dateSpan = this.modalContainer.querySelector(".cs-modal-date .cs-modal-date-day") as HTMLSpanElement;
	}

	public setState(state: boolean): void {
		this.modalContainer.classList.toggle("cs-hidden", !state);
		this.scrim.classList.toggle("cs-hidden", !state);
	}

	public setDate(rawDate: string): void {
		const date = new Date(rawDate);

		this.weekdaySpan.innerText = this.getDayofWeek(date);
		this.dateSpan.innerText = new Date(date).toLocaleDateString("nl-nl");
	}

	private getDayofWeek(date: Date): string {
		const dayNum = date.getDay();

		return this.daysOfWeek[(dayNum + 6) % 7];
	}
}
