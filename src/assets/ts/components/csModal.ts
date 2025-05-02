import { csCalendar } from "./csCalendar";
import { csForm } from "./csForm";

export class csModal {
	private modalContainer: HTMLDivElement;
	private scrim: HTMLDivElement;
	private weekdaySpan: HTMLSpanElement;
	private dateSpan: HTMLSpanElement;
	private backButton: HTMLDivElement;
	private saveButton: HTMLDivElement;
	private modalContentForm: HTMLFormElement;

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
		this.modalContentForm = <HTMLFormElement>this.modalContainer.querySelector(".cs-modal-content");
	}

	public init(): void {
		this.setControls();
	}

	public setState(state: boolean): void {
		this.modalContainer.classList.toggle("cs-hidden", !state);
		this.scrim.classList.toggle("cs-hidden", !state);

		if (!state) {
			this.modalContentForm.reset();
			// reset conditional questions
			const conditionalQuestions = this.modalContentForm.querySelectorAll(
				".cs-modal-effect-medication, .cs-modal-cluster-amount"
			);

			for (const elem of conditionalQuestions) {
				elem.classList.add("cs-hidden");
			}
		}
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
			new csForm().sendData(csModal.currentDate);
			this.setState(false);

			const targetContentContainer = <HTMLDivElement>(
				document.querySelector(`.cs-cell-content-container[data-date="${csModal.currentDate}"]`)
			);

			new csCalendar().addAttack(targetContentContainer);
		});
		this.modalContentForm.addEventListener("keydown", (e: KeyboardEvent) => {
			if (e.key === "13") {
				e.preventDefault();
			}
		});
	}

	private getDayofWeek(): string {
		return new csCalendar().daysOfWeek[(csModal.currentDate.getDay() + 6) % 7];
	}
}
