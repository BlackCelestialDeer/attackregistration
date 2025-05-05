import { csCalendar } from "../components/csCalendar";
import { csDatabase } from "../components/csDatabase";

import * as raw from "./testdata.json"; // Use 'import * as' to import JSON

const typedData: Record<string, IAttackEntry> = raw;

export class csTesting {
	public setTestData(active: boolean): void {
		if (!active) {
			return;
		}

		const data = typedData.default;

		for (const [key, item] of Object.entries(data)) {
			console.log(key);
			const targetContentContainer = <HTMLDivElement>(
				document.querySelector(`.cs-cell-content-container[data-date="${item.date}"]`)
			);

			new csDatabase().saveAttack(item);

			new csCalendar().addAttack(targetContentContainer);
		}
	}
}
