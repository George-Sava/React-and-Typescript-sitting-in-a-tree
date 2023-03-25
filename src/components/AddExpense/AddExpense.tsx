import { useRef } from 'react';

interface Props {
	handleAddExpense: (name: string, amount: number) => void;
	className?: string;
}

export function AddExpense({ handleAddExpense, className }: Props) {
	const expenseName = useRef<HTMLInputElement>(null);
	const expenseAmount = useRef<HTMLInputElement>(null);

	return (
		<div className={className}>
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
							handleAddExpense(name, Number(amount));
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
