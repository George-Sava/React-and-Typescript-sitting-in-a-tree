import { useRef } from 'react';

interface Props {
	handleAddIncome: (income: number) => void;
	className?: string;
}

export function AddIncome({ handleAddIncome, className }: Props) {
	const incomeRef = useRef<HTMLInputElement>(null);

	return (
		<div className={className}>
			<h3>Insert monthly income:</h3>
			<input type="number" ref={incomeRef} />
			<div className="btn-container">
				<button
					onClick={() => {
						const income = incomeRef.current?.value;
						if (income) {
							incomeRef.current.value = '';

							handleAddIncome(Number(income));
						}
					}}
				>
					Submit
				</button>
			</div>
		</div>
	);
}
