import { useRef, useState } from 'react';
import { State } from 'types';
import { YearMonthGroup } from '../YearMonthGroup/YearMonthGroup';

interface Props {
	state: State;
	handleAddExpense: (year: number, month: number, name: string, amount: number) => void;
	className?: string;
}

export function AddExpense({ state, handleAddExpense, className }: Props) {
	const expenseName = useRef<HTMLInputElement>(null);
	const expenseAmount = useRef<HTMLInputElement>(null);

	const [selectedYear, setSelectedYear] = useState('');
	const [selectedMonth, setSelectedMonth] = useState('');

	function handleYearChange(year: string) {
		setSelectedYear(year);
		setSelectedMonth('');
	}

	function handleMonthChange(month: string) {
		setSelectedMonth(month);
	}

	return (
		<div className={className}>
			<h3>Select appropriate year and month for adding expense</h3>
			<YearMonthGroup
				state={state}
				selectedYear={selectedYear}
				selectedMonth={selectedMonth}
				handleYearChange={handleYearChange}
				handleMonthChange={handleMonthChange}
			/>
			<h3>Insert expense:</h3>
			<div className="expense-container">
				<label htmlFor="expense-name">Name:</label>
				<input type="text" ref={expenseName} />
			</div>
			<div className="expense-container">
				<label htmlFor="expense-amount">Amount:</label>
				<input type="number" ref={expenseAmount} />
			</div>
			<div className="btn-container">
				<button
					onClick={() => {
						const name = expenseName.current?.value;
						const amount = expenseAmount.current?.value;
						if (name && amount) {
							handleAddExpense(
								Number(selectedYear),
								Number(selectedMonth),
								name,
								Number(amount)
							);
							expenseName.current.value = '';
							expenseAmount.current.value = '';
						}
					}}
				>
					Submit
				</button>
			</div>
		</div>
	);
}
