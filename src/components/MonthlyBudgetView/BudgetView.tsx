import { YearMonthGroup } from 'components/YearMonthGroup/YearMonthGroup';
import { getMonth, getTotalBudget } from 'helpers';
import { useMemo, useState } from 'react';
import { State } from '../../types';
import './BudgetView.css';

interface Props {
	state: State;
	className?: string;
}

export function MonthlyBudgetView({ state, className }: Props) {
	const [selectedYear, setSelectedYear] = useState('');
	const [selectedMonth, setSelectedMonth] = useState('');

	const monthlyBudgetJsx = useMemo(
		() =>
			selectedYear != '' && selectedMonth != '' ? (
				<h4>
					Total Budget for{' '}
					<span className="view-total-month">{getMonth(Number(selectedMonth))}</span>{' '}
					<span className="view-total-year">{selectedYear}</span> is:{' '}
					{getTotalBudget(state[Number(selectedYear)][Number(selectedMonth)])} parale
				</h4>
			) : (
				<h4>Select month and year to view monthly budget</h4>
			),
		[selectedYear, selectedMonth, state]
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
				handleYearChange={handleYearChange}
				handleMonthChange={handleMonthChange}
				selectedMonth={selectedMonth}
				selectedYear={selectedYear}
			/>
			{monthlyBudgetJsx}
		</div>
	);
}
