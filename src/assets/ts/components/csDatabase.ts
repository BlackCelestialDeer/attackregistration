export class csDatabase {
	public static attacksObject: Record<string, IAttackEntry[]> = {};

	public saveAttack(date: Date, item: IAttackEntry): void {
		const key = date.toDateString();
		if (!csDatabase.attacksObject[key]) {
			csDatabase.attacksObject[key] = [];
		}
		csDatabase.attacksObject[key].push(item);
	}
}
