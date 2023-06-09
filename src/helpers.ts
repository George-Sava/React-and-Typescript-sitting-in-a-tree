import { BudgetNode } from 'types';

export function getTotalBudget(node: BudgetNode | undefined): number {
	if (!node) {
		return 0;
	}

	const currentAmount = node.item.amount;
	const leftSubtreeAmount = getTotalBudget(node.left);
	const rightSubtreeAmount = getTotalBudget(node.right);

	return currentAmount + leftSubtreeAmount + rightSubtreeAmount;
}

function visitNodes(node: BudgetNode | undefined, callback: (node: BudgetNode) => void) {
	if (node === undefined) {
		return;
	}

	callback(node);
	visitNodes(node.left, callback);
	visitNodes(node.right, callback);
}

export function getBudgetItems(node: BudgetNode | undefined): BudgetNode[] {
	const nodes: BudgetNode[] = [];
	visitNodes(node, node => nodes.push(node));
	return nodes;
}

export function getDepth(node: BudgetNode | undefined): number {
	if (!node) {
		return 0;
	}

	return Math.max(getDepth(node.left), getDepth(node.right)) + 1;
}
