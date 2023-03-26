import { addMonthlyBudget, getDepth, getMonth } from 'helpers';
import { useState } from 'react';
import { BudgetNode, State } from 'types';
import './App.css';
import { MonthlyBudgetView } from '../MonthlyBudgetView/BudgetView';
import { AddMonthlyBudget } from 'components/AddMonthlyBudget/AddMonthlyBudget';
import { AddExpense } from '../AddExpense/AddExpense';
import { ViewMonthlyExpenses } from 'components/ViewMonthlyExpenses/ViewMonthlyExpenses';

export function App() {
	const [state, setState] = useState<State>({});

	function handleAddIncome(year: number, month: number, income: number) {
		setState(prevState => {
			const prevBudget =
				state[year] && state[year][month] ? prevState[year][month] : undefined;

			const monthString = getMonth(month);

			const budget = addMonthlyBudget(prevBudget, {
				name: 'Income',
				amount: income,
				month: monthString
			});

			return {
				...prevState,
				[year]: {
					...prevState[year],
					[month]: budget
				}
			};
		});
	}

	function handleAddExpense(year: number, month: number, name: string, amount: number) {
		setState(prevBudget => {
			const newItem = {
				name,
				amount
			};

			const selectedBudget = prevBudget[year][month];

			if (selectedBudget.name === name) {
				return {
					...prevBudget,
					[year]: {
						...prevBudget[year],
						[month]: {
							...selectedBudget,
							amount: selectedBudget.amount + amount
						}
					}
				};
			}

			const addNewChild = (node: BudgetNode): BudgetNode => {
				if (node.name === name) {
					return {
						...node,
						amount: node.amount + amount
					};
				}

				if (!node.left) {
					return {
						...node,
						left: newItem
					};
				}

				if (node.left.name === name) {
					return {
						...node,
						left: {
							...node.left,
							amount: node.left.amount + amount
						}
					};
				}

				if (!node.right) {
					return {
						...node,
						right: newItem
					};
				}

				if (node.right.name === name) {
					return {
						...node,
						right: {
							...node.right,
							amount: node.right.amount + amount
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

			return {
				...prevBudget,
				[year]: {
					...prevBudget[year],
					[month]: addNewChild(selectedBudget)
				}
			};
		});
	}

	return (
		<div className="flex-container">
			<h1>Budget App</h1>
			<MonthlyBudgetView state={state} className="box container" />

			<AddMonthlyBudget className="box container" handleAddIncome={handleAddIncome} />

			<AddExpense
				state={state}
				className="box container"
				handleAddExpense={handleAddExpense}
			/>

			<ViewMonthlyExpenses state={state} className="box container" />
		</div>
	);
}
