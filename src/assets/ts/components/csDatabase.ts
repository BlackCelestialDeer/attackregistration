export class csDatabase {
	public static attacksObject: Record<string, IAttackEntry[]> = {};
	public static attacksID: number = -1;
	private static recordedDates: string[] = [];

	public saveAttack(item: IAttackEntry): void {
		csDatabase.attacksID++;

		if (csDatabase.recordedDates.indexOf(item.date) < 0) {
			csDatabase.recordedDates.push(item.date);
		}

		if (!csDatabase.attacksObject[csDatabase.attacksID]) {
			csDatabase.attacksObject[csDatabase.attacksID] = [];
		}

		csDatabase.attacksObject[csDatabase.attacksID].push(item);
	}
}
