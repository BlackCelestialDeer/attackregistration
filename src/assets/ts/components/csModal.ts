import { csCalendar } from "./csCalendar";

export class csModal {
	private modalContainer: HTMLDivElement;
	private scrim: HTMLDivElement;
	private weekdaySpan: HTMLSpanElement;
	private dateSpan: HTMLSpanElement;
	private backButton: HTMLDivElement;
	private saveButton: HTMLDivElement;
	private clusterBoolInputs: NodeListOf<HTMLInputElement>;
	private attackCount: HTMLDivElement;

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
		this.clusterBoolInputs = <NodeListOf<HTMLInputElement>>(
			this.modalContainer.querySelectorAll('input[name="cluster_attack"]')
		);
		this.attackCount = <HTMLDivElement>this.modalContainer.querySelector("#csAttackCountContainer");
	}

	public init(): void {
		this.setControls();
	}

	public setState(state: boolean): void {
		this.modalContainer.classList.toggle("cs-hidden", !state);
		this.scrim.classList.toggle("cs-hidden", !state);

		if (!state) {
			(<HTMLFormElement>this.modalContainer.querySelector(".cs-modal-content")).reset();
			this.attackCount.classList.add("cs-hidden");
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
			this.setState(false);

			const targetContentContainer = <HTMLDivElement>(
				document.querySelector(`.cs-cell-content-container[data-date="${csModal.currentDate}"]`)
			);

			new csCalendar().addAttack(targetContentContainer);
		});

		this.clusterBoolInputs.forEach((elem) => {
			elem.addEventListener("change", () => {
				this.attackCount.classList.toggle("cs-hidden", elem.value !== "Ja");
			});
		});
	}

	private getDayofWeek(): string {
		return new csCalendar().daysOfWeek[(csModal.currentDate.getDay() + 6) % 7];
	}
}
