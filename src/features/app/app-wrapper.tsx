import { MainTemplate } from '@/templates/main-template';

type Props = {
	children: React.ReactNode;
};

export const AppWrapper: React.FC<Props> = ({ children, ...rest }) => {
	return <MainTemplate>{children}</MainTemplate>;
};