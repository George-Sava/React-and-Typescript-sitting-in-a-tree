import { getMonthOptions, getYearOptions } from 'components/jsxHelpers';
import { useMemo } from 'react';
import { State } from 'types';

interface Props {
	state: State;
	selectedYear: string;
	selectedMonth: string;
	handleYearChange: (year: string) => void;
	handleMonthChange: (month: string) => void;
}

export function YearMonthGroup({
	state,
	selectedYear,
	selectedMonth,
	handleYearChange,
	handleMonthChange
}: Props) {
	const yearKeys = useMemo(() => Object.keys(state), [state]);

	const yearOptions = useMemo(() => getYearOptions(yearKeys), [yearKeys]);

	const monthOptions = useMemo(() => getMonthOptions(selectedYear, state), [selectedYear, state]);

	return (
		<div className="view-inputs">
			<div className="view__year">
				<label htmlFor="year">Year:</label>
				<select
					className="select-year"
					value={selectedYear}
					onChange={e => handleYearChange(e.target.value)}
				>
					{yearOptions}
				</select>
			</div>

			<div className="view__month">
				<label htmlFor="month">Month:</label>
				<select
					className="select-month"
					value={selectedMonth}
					onChange={e => handleMonthChange(e.target.value)}
				>
					{monthOptions}
				</select>
			</div>
		</div>
	);
}
