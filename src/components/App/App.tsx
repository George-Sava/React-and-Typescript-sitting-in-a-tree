import './App.css';
interface Props {
	text?: string;
}

export function App({ text }: Props) {
	if (text) {
		return <div>{text}</div>;
	}
	return <div>Hello</div>;
}
