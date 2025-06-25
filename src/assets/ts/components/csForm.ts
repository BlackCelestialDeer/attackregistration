import { csDatabase } from "./csDatabase";

export class csForm {
	private modalContentForm: HTMLFormElement;
	private medicationRadioInputs: NodeListOf<HTMLInputElement>;
	private medicationEffect: HTMLDivElement;

	constructor() {
		this.modalContentForm = <HTMLFormElement>document.querySelector(".cs-modal .cs-modal-content");
		
		this.medicationRadioInputs = <NodeListOf<HTMLInputElement>>(
			this.modalContentForm.querySelectorAll('input[name="took_medication"]')
		);
		this.medicationEffect = <HTMLDivElement>this.modalContentForm.querySelector("#csMedicationEffectContainer");
	}

	public init(): void {
		this.setupEventListeners();
	}

	public sendData(date: Date): void {
		const database = new csDatabase();
		const formData = new FormData(this.modalContentForm);

		const dataObject: IAttackEntry = {
			date: date.toDateString(),
			type_attack: (formData.get("type_attack") || "").toString(),
			cluster_attack: (formData.get("cluster_attack") || "").toString(),
			attack_count: (formData.get("attack_count") || "1").toString(),
			took_medication: (formData.get("took_medication") || "").toString(),
			effect_medication: (formData.get("effect_medication") || "").toString(),
			triggers: (formData.get("triggers") || "").toString(),
			factors: (formData.get("factors") || "").toString()
		};

		database.saveAttack(dataObject);
	}

	private setupEventListeners(): void {

		this.medicationRadioInputs.forEach((elem) => {
			elem.addEventListener("change", () => {
				this.medicationEffect.classList.toggle("cs-hidden", elem.value !== "Ja");
			});
		});
	}
}
