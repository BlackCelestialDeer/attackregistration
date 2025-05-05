export class csDatabase {
	public static attacksObject: Record<string, IAttackEntry> = {};
	public static attacksID: number = -1;

	public saveAttack(item: IAttackEntry): void {
		csDatabase.attacksID++;

		if (!csDatabase.attacksObject[csDatabase.attacksID]) {
			csDatabase.attacksObject[csDatabase.attacksID] = item;
		}
	}
}
