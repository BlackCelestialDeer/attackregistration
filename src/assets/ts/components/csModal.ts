import { csCalendar } from "./csCalendar";

export class csModal {
	private modalContainer: HTMLDivElement;
	private scrim: HTMLDivElement;
	private weekdaySpan: HTMLSpanElement;
	private dateSpan: HTMLSpanElement;
	private backButton: HTMLDivElement;
	private saveButton: HTMLDivElement;
	private static currentDate: Date;

	constructor() {
		this.modalContainer = document.querySelector(".cs-modal") as HTMLDivElement;
		this.scrim = document.querySelector(".cs-scrim") as HTMLDivElement;
		this.weekdaySpan = this.modalContainer.querySelector(
			".cs-modal-date .cs-modal-date-weekday"
		) as HTMLSpanElement;
		this.dateSpan = this.modalContainer.querySelector(".cs-modal-date .cs-modal-date-day") as HTMLSpanElement;
		this.backButton = <HTMLDivElement>this.modalContainer.querySelector("#csModalButtonBack");
		this.saveButton = <HTMLDivElement>this.modalContainer.querySelector("#csModalButtonSave");
	}

	public init(): void {
		this.setControls();
	}
	public setState(state: boolean): void {
		this.modalContainer.classList.toggle("cs-hidden", !state);
		this.scrim.classList.toggle("cs-hidden", !state);
	}

	public setDate(rawDate: string): void {
		csModal.currentDate = new Date(rawDate);

		this.weekdaySpan.innerText = this.getDayofWeek();
		this.dateSpan.innerText = new Date(csModal.currentDate).toLocaleDateString("nl-nl");
	}

	private setControls(): void {
		this.backButton.addEventListener("click", () => {
			this.setState(false);
		});

		this.saveButton.addEventListener("click", () => {
			this.setState(false);

			const targetContentContainer = <HTMLDivElement>(
				document.querySelector(`.cs-cell-content-container[data-date="${csModal.currentDate}"]`)
			);

			new csCalendar().addAttack(targetContentContainer);
		});
	}

	private getDayofWeek(): string {
		return new csCalendar().daysOfWeek[(csModal.currentDate.getDay() + 6) % 7];
	}
}
