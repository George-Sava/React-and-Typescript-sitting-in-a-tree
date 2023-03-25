import { addBudgetItem, getBudgetItems, getTotalBudget } from 'helpers';
import { useMemo, useState } from 'react';
import { BudgetNode } from 'types';
import './App.css';
import { AddIncome } from '../AddIncome/AddIncome';
import { AddExpense } from '../AddExpense/AddExpense';

export function App() {
	const [state, setState] = useState<BudgetNode | null>(null);

	const budgetItems = useMemo(
		() => getBudgetItems(state).filter(node => node.item.name !== 'Income'),
		[state]
	);

	function handleAddIncome(income: number) {
		setState(prevBudget =>
			addBudgetItem(prevBudget, {
				name: 'Income',
				amount: Number(income)
			})
		);
	}

	function handleAddExpense(name: string, amount: number) {
		if (name && amount) {
			setState(prevBudget => addBudgetItem(prevBudget, { name, amount: Number(amount) }));
		}
	}

	console.log('state', state);

	return (
		<div className="flex-container">
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
