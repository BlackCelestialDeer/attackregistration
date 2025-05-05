export class csDatabase {
	public static attacksObject: Record<string, IAttackEntry> = {};
	public static attacksID: number = -1;
	public static dateIDs: { [date: string]: number[] } = {};

	public saveAttack(item: IAttackEntry): void {
		csDatabase.attacksID++;

		if (!csDatabase.attacksObject[csDatabase.attacksID]) {
			csDatabase.attacksObject[csDatabase.attacksID] = item;
		}

		if (!csDatabase.dateIDs[item.date]) {
			csDatabase.dateIDs[item.date] = [];
		}

		csDatabase.dateIDs[item.date].push(csDatabase.attacksID);
	}
}
