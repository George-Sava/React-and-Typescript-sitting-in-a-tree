import { getBudgetItems } from 'helpers';
import { useCallback, useState } from 'react';
import { State } from 'types';
import { YearMonthGroup } from '../YearMonthGroup/YearMonthGroup';

interface Props {
	state: State;
	className?: string;
}

export function ViewMonthlyExpenses({ state, className }: Props) {
	const [selectedYear, setSelectedYear] = useState('');
	const [selectedMonth, setSelectedMonth] = useState('');

	const budgetItems = useCallback(
		(year: number, month: number) =>
			state[year] && state[year][month]
				? getBudgetItems(state[year][month]).filter(node => node.name !== 'Income')
				: [],
		[state]
	);

	function handleYearChange(year: string) {
		setSelectedYear(year);
		setSelectedMonth('');
	}

	function handleMonthChange(month: string) {
		setSelectedMonth(month);
	}

	return (
		<div className={className}>
			<YearMonthGroup
				state={state}
				selectedYear={selectedYear}
				selectedMonth={selectedMonth}
				handleMonthChange={handleMonthChange}
				handleYearChange={handleYearChange}
			/>
			<h3>Expenses:</h3>
			{selectedYear != '' &&
			selectedMonth != '' &&
			budgetItems(Number(selectedYear), Number(selectedMonth)).length > 0 ? (
				<ul>
					{budgetItems(Number(selectedYear), Number(selectedMonth)).map((node, i) => (
						<li key={`${node.name}-${i}`}>
							<span className="expense-item">{node.name}</span>: {node.amount}
						</li>
					))}
				</ul>
			) : (
				<h3>No expenses this month</h3>
			)}
		</div>
	);
}
