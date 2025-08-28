import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SupportForm from './pages/Support/SupportForm';
import SupportConfirmation from './pages/Support/SupportConfirmation';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<SupportForm />} />
				<Route path="/confirmation" element={<SupportConfirmation />} />
			</Routes>
		</BrowserRouter>
	);
}
