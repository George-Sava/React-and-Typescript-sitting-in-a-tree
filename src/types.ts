export interface BudgetItem {
	name: string;
	amount: number;
}
export interface BudgetNode {
	item: BudgetItem;
	left?: BudgetNode;
	right?: BudgetNode;
}
