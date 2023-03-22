import { BudgetItem, BudgetNode, BudgetNodeVisitor } from 'types';

export function addItem(node: BudgetNode | null | undefined, item: BudgetItem): BudgetNode {
	if (node === undefined || node === null) {
		return { item };
	}

	if (node.item.name === item.name) {
		return { ...node, item: { ...node.item, amount: node.item.amount + item.amount } };
	}

	return node;
}

export function addBudgetItem(node: BudgetNode | null | undefined, item: BudgetItem): BudgetNode {
	if (node === undefined || node === null) {
		return addItem(node, item);
	}

	if (node.item.name === item.name) {
		return addItem(node, item);
	}

	if (!node.left) {
		return {
			...node,
			left: addItem(node.left, item)
		};
	}

	if (!node.right) {
		return {
			...node,
			right: addItem(node.right, item)
		};
	}

	return {
		...node,
		left: addBudgetItem(node.left, item),
		right: addBudgetItem(node.right, item)
	};
}
export function getTotalBudget(node: BudgetNode | null | undefined): number {
	if (!node) {
		return 0;
	}

	const currentAmount = node.item.amount;
	const leftAmount = getTotalBudget(node.left);
	const rightAmount = getTotalBudget(node.right);

	return currentAmount + leftAmount + rightAmount;
}
export function getBudgetItems(node: BudgetNode | null): BudgetNode[] {
	return node ? visitNodes(node, node => node) : [];
}

export function visitNodes<T>(
	node: BudgetNode | null | undefined,
	visitor: BudgetNodeVisitor<T>
): T[] {
	if (node === undefined || node === null) {
		return [];
	}
	const left = visitNodes(node.left, visitor);
	const self = visitor(node);
	const right = visitNodes(node.right, visitor);
	return [...left, self, ...right];
}
