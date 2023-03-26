import { getMonth } from 'helpers';
import { State } from 'types';

export function getYearOptions(yearKeys: string[]) {
	const options = [];

	for (let i = 0; i < yearKeys.length + 1; i++) {
		options.push(
			i === 0 ? (
				<option key={i} value={''}>
					{' '}
					Select Year
				</option>
			) : (
				<option key={i} value={yearKeys[i - 1]}>
					{yearKeys[i - 1]}
				</option>
			)
		);
	}
	return options;
}

export function getMonthOptions(selectedYear: string, state: State) {
	const options = [];

	const monthKeys = state[Number(selectedYear)] ? Object.keys(state[Number(selectedYear)]) : [];

	for (let i = 0; i < monthKeys.length + 1; i++) {
		options.push(
			i === 0 ? (
				<option key={i} value={''}>
					Select Month
				</option>
			) : (
				<option key={i} value={Number(monthKeys[i - 1])}>
					{getMonth(Number(monthKeys[i - 1]))}
				</option>
			)
		);
	}
	return options;
}
