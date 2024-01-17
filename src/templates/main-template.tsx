import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { HeartWithNumber } from '@/ui/atoms/heart-with-number';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import useLocalStorage from 'use-local-storage';
import { favoriteSongsKey, FavoriteSongsType } from '@/types/local-storage';
import { BackIcon } from '@/ui/atoms/icons';
import Link from 'next/link';


const titleMapObject: { [key: string]: string } = {
	'/artists': 'Artists',
	'/artists/[id]': 'Artist',
	'/favorites': 'Favorites',
};

type Props = {
	children: React.ReactNode;
};

export const MainTemplate: React.FC<Props> = ({ children }) => {
	const [loaded, setLoaded] = useState(false);

	const [title, setTitle] = useState<string>('');
	const router = useRouter();

	const [favoriteSongs, setFavoriteSongs] = useLocalStorage<FavoriteSongsType>(favoriteSongsKey, {});

	useEffect(() => {
		setLoaded(true);
	}, []);

	useEffect(() => {
		const title = titleMapObject[router.pathname] || '';
		setTitle(title);
	}, [router.pathname]);

	const heartsNumber = useMemo(() => {
		return Object.keys(favoriteSongs).reduce((curr, next) => {
			if (favoriteSongs[next]) {
				++curr;
			}
			return curr;
		}, 0);
	}, [favoriteSongs]);

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
						>
							{router.pathname !== '/artists' && (
								<Link href={'/artists'}>
									<BackIcon />
								</Link>
							)}
						</IconButton>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							{title}
						</Typography>
						{loaded && (
							<Link href="/favorites">
								<HeartWithNumber number={heartsNumber} />
							</Link>
						)}
					</Toolbar>
				</AppBar>
			</Box>
			{children}
		</>
	);
};