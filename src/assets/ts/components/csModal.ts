import { csCalendar } from "./csCalendar";
import { csDatabase } from "./csDatabase";

export class csModal {
	private modalContainer: HTMLDivElement;
	private scrim: HTMLDivElement;
	private weekdaySpan: HTMLSpanElement;
	private dateSpan: HTMLSpanElement;
	private backButton: HTMLDivElement;
	private saveButton: HTMLDivElement;
	private medicationRadioInputs: NodeListOf<HTMLInputElement>;
	private clusterRadioInputs: NodeListOf<HTMLInputElement>;
	private attackCount: HTMLDivElement;
	private medicationEffect: HTMLDivElement;
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
		this.clusterRadioInputs = <NodeListOf<HTMLInputElement>>(
			this.modalContainer.querySelectorAll('input[name="cluster_attack"]')
		);
		this.medicationRadioInputs = <NodeListOf<HTMLInputElement>>(
			this.modalContainer.querySelectorAll('input[name="took_medication"]')
		);
		this.attackCount = <HTMLDivElement>this.modalContainer.querySelector("#csAttackCountContainer");
		this.medicationEffect = <HTMLDivElement>this.modalContainer.querySelector("#csMedicationEffectContainer");
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

			this.sendData(csModal.currentDate);
		});

		this.clusterRadioInputs.forEach((elem) => {
			elem.addEventListener("change", () => {
				this.attackCount.classList.toggle("cs-hidden", elem.value !== "Ja");
			});
		});

		this.medicationRadioInputs.forEach((elem) => {
			elem.addEventListener("change", () => {
				this.medicationEffect.classList.toggle("cs-hidden", elem.value !== "Ja");
			});
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

	private sendData(date: Date): void {
		const formData = new FormData(this.modalContentForm);

		const dataObject: IAttackEntry = {
			type_attack: (formData.get("type_attack") || "").toString(),
			cluster_attack: (formData.get("cluster_attack") || "").toString(),
			took_medication: (formData.get("took_medication") || "").toString(),
			effect_medication: (formData.get("effect_medication") || "").toString(),
			triggers: (formData.get("triggers") || "").toString(),
			factors: (formData.get("factors") || "").toString()
		};

		console.log(dataObject);

		new csDatabase().saveAttack(date, dataObject);
	}
}
