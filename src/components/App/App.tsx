import { getBudgetItems, getDepth, getTotalBudget } from 'helpers';
import { useMemo, useState } from 'react';
import { BudgetNode } from 'types';
import './App.css';
import { AddIncome } from '../AddIncome/AddIncome';
import { AddExpense } from '../AddExpense/AddExpense';

export function App() {
	const [state, setState] = useState<BudgetNode | undefined>();

	const budgetItems = useMemo(
		() => getBudgetItems(state).filter(node => node.item.name !== 'Income'),
		[state]
	);

	function handleAddIncome(income: number) {
		setState(prevBudget => {
			if (!prevBudget) {
				return {
					item: {
						name: 'Income',
						amount: income
					}
				};
			} else {
				return {
					...prevBudget,
					item: {
						...prevBudget.item,
						amount: prevBudget.item.amount + income
					}
				};
			}
		});
	}

	function handleAddExpense(name: string, amount: number) {
		setState(prevBudget => {
			const newItem = {
				name,
				amount
			};

			if (!prevBudget) {
				return {
					item: newItem
				};
			}

			if (prevBudget.item.name === name) {
				return {
					...prevBudget,
					item: {
						...prevBudget.item,
						amount: prevBudget.item.amount + amount
					}
				};
			}

			const addNewChild = (node: BudgetNode): BudgetNode => {
				if (node.item.name === name) {
					return {
						...node,
						item: {
							...node.item,
							amount: node.item.amount + amount
						}
					};
				}

				if (!node.left) {
					return {
						...node,
						left: {
							item: newItem
						}
					};
				}

				if (node.left.item.name === name) {
					return {
						...node,
						left: {
							...node.left,
							item: {
								...node.left.item,
								amount: node.left.item.amount + amount
							}
						}
					};
				}

				if (!node.right) {
					return {
						...node,
						right: {
							item: newItem
						}
					};
				}

				if (node.right.item.name === name) {
					return {
						...node,
						right: {
							...node.right,
							item: {
								...node.right.item,
								amount: node.right.item.amount + amount
							}
						}
					};
				}

				const leftDepth = getDepth(node.left);
				const rightDepth = getDepth(node.right);

				if (leftDepth <= rightDepth) {
					return {
						...node,
						left: addNewChild(node.left)
					};
				} else {
					return {
						...node,
						right: addNewChild(node.right)
					};
				}
			};

			return addNewChild(prevBudget);
		});
	}

	console.log('state', state);

	return (
		<div className="flex-container">
			<h1>Budget App</h1>
			{state && (
				<div className="box container">
					<h3>Total budget:</h3>
					<p className="total">{getTotalBudget(state)} parale</p>
				</div>
			)}

			<AddIncome handleAddIncome={handleAddIncome} className="box container" />

			<AddExpense handleAddExpense={handleAddExpense} className="box container" />

			<div className="box container">
				<h3>Expenses</h3>
				<ul>
					{budgetItems.map((node, i) => (
						<li key={`${node.item.name}-${i}`} className="expense-item">
							<span className="item-name">{node.item.name}</span>: {node.item.amount}{' '}
							parale
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
