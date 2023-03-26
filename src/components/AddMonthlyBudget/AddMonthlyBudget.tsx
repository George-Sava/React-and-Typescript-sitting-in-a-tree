import { getMonth } from 'helpers';
import { useMemo, useRef } from 'react';

interface Props {
	handleAddIncome: (year: number, month: number, income: number) => void;
	className?: string;
}

export function AddMonthlyBudget({ handleAddIncome, className }: Props) {
	const yearRef = useRef<HTMLInputElement>(null);
	const monthRef = useRef<HTMLSelectElement>(null);
	const incomeRef = useRef<HTMLInputElement>(null);

	const selectOptions = useMemo(() => {
		const options = [];
		for (let i = 0; i < 12; i++) {
			options.push(
				<option key={i} value={i}>
					{getMonth(i)}
				</option>
			);
		}
		return options;
	}, []);

	function resetInput() {
		if (incomeRef.current) {
			incomeRef.current.value = '';
		}
	}

	return (
		<div className={className}>
			<h3>Insert monthly income:</h3>
			<div>
				<label htmlFor="year">Add Year:</label>
				<input type="number" ref={yearRef} />
			</div>
			<div>
				<label htmlFor="month">Select Month:</label>
				<select className="select-month" ref={monthRef}>
					{selectOptions}
				</select>
			</div>
			<div>
				<label htmlFor="income">Add Income:</label>
				<input type="number" ref={incomeRef} />
			</div>
			<div className="btn-container">
				<button
					onClick={() => {
						const income = incomeRef.current ? incomeRef.current.value : null;
						const year = yearRef.current ? yearRef.current.value : null;
						const month = monthRef.current ? monthRef.current.value : null;

						if (income && year && month !== null) {
							handleAddIncome(Number(year), Number(month), Number(income));
							resetInput();
						}
					}}
				>
					Submit
				</button>
			</div>
		</div>
	);
}
