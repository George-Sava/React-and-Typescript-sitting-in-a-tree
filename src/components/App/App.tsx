import { addBudgetItem, getBudgetItems, getTotalBudget } from 'helpers';
import { useMemo, useRef, useState } from 'react';
import { BudgetNode } from 'types';
import './App.css';

export function App() {
	const [budget, setBudget] = useState<BudgetNode | null>(null);

	const incomeRef = useRef<HTMLInputElement>(null);
	const expenseName = useRef<HTMLInputElement>(null);
	const expenseAmount = useRef<HTMLInputElement>(null);

	const budgetItems = useMemo(
		() => getBudgetItems(budget).filter(node => node.item.name !== 'Income'),
		[budget]
	);

	return (
		<div className="flex-container">
			<h2>Total budget is: {getTotalBudget(budget)}</h2>

			<div>
				<h3>Insert monthly income:</h3>
				<input type="number" ref={incomeRef} />
				<button
					onClick={() => {
						const income = incomeRef.current?.value;
						if (income) {
							incomeRef.current.value = '';
							setBudget(prevBudget =>
								addBudgetItem(prevBudget, {
									name: 'Income',
									amount: Number(income)
								})
							);
						}
					}}
				>
					Submit
				</button>

				<h3>Insert expense:</h3>
				<label htmlFor="expense-name">Name:</label>
				<input type="text" ref={expenseName} />
				<label htmlFor="expense-amount">Amount:</label>
				<input type="number" ref={expenseAmount} />
				<button
					onClick={() => {
						const name = expenseName.current?.value;
						const amount = expenseAmount.current?.value;
						if (name && amount) {
							expenseName.current.value = '';
							expenseAmount.current.value = '';
							setBudget(prevBudget =>
								addBudgetItem(prevBudget, { name, amount: Number(amount) })
							);
						}
					}}
				>
					Submit
				</button>
			</div>
			<div>
				<h3>Expenses items:</h3>
				<ul>
					{budgetItems.map((node, i) => (
						<li key={`${node.item.name}-${i}`}>
							{node.item.name}: {node.item.amount}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
