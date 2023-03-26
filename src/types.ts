export interface BudgetItem {
	name: string;
	amount: number;
}
export interface BudgetNode extends BudgetItem {
	left?: BudgetNode;
	right?: BudgetNode;
}

export interface RootBudgetNode extends BudgetNode {
	month?: string;
}

export interface State {
	[year: number]: NumericMap<RootBudgetNode>;
}

export interface NumericMap<T> {
	[key: number]: T;
}
