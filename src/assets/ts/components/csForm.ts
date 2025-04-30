import { csDatabase } from "./csDatabase";

export class csForm {
	private modalContentForm: HTMLFormElement;
	private medicationRadioInputs: NodeListOf<HTMLInputElement>;
	private clusterRadioInputs: NodeListOf<HTMLInputElement>;
	private attackCount: HTMLDivElement;
	private medicationEffect: HTMLDivElement;

	constructor() {
		this.modalContentForm = <HTMLFormElement>document.querySelector(".cs-modal .cs-modal-content");
		this.clusterRadioInputs = <NodeListOf<HTMLInputElement>>(
			this.modalContentForm.querySelectorAll('input[name="cluster_attack"]')
		);
		this.medicationRadioInputs = <NodeListOf<HTMLInputElement>>(
			this.modalContentForm.querySelectorAll('input[name="took_medication"]')
		);
		this.attackCount = <HTMLDivElement>this.modalContentForm.querySelector("#csAttackCountContainer");
		this.medicationEffect = <HTMLDivElement>this.modalContentForm.querySelector("#csMedicationEffectContainer");
	}

	public init(): void {
		this.setupEventListeners();
	}

	public sendData(date: Date): void {
		const activeModal = document.querySelector(".cs-modal:not(.cs-hidden)");
		if (!activeModal) {
			console.error("No active modal found");
			return;
		}

		const form = <HTMLFormElement>activeModal.querySelector("form.cs-modal-content");
		const formData = new FormData(form);

		for (const [key, value] of formData.entries()) {
			console.log(`${key}: `, value);
		}

		const dataObject: IAttackEntry = {
			type_attack: (formData.get("type_attack") || "").toString(),
			cluster_attack: (formData.get("cluster_attack") || "").toString(),
			attack_count: (formData.get("attack_count") || "1").toString(),
			took_medication: (formData.get("took_medication") || "").toString(),
			effect_medication: (formData.get("effect_medication") || "").toString(),
			triggers: (formData.get("triggers") || "").toString(),
			factors: (formData.get("factors") || "").toString()
		};

		console.log(dataObject);

		new csDatabase().saveAttack(date, dataObject);
	}

	private setupEventListeners(): void {
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
	}
}
