import { MainTemplate } from '@/templates/main-template';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/redux';

type Props = {
	children: React.ReactNode;
};

export const AppWrapper: React.FC<Props> = ({ children }) => {
	return (
		<ReduxProvider store={store}>
			<MainTemplate>{children}</MainTemplate>
		</ReduxProvider>
	);
};
