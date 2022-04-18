import { Button, Card, Grid, TextField } from '@material-ui/core';
import { Box } from '@material-ui/system';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TrackList from '../../components/TrackList';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import MainLayout from '../../layouts/MainLayout';
import { NextThunkDispatch, wrapper } from '../../store';
import { fetchTracks, searchTracks } from '../../store/action-creators/tracks';

const Index = () => {
	const router = useRouter();

	const { error, tracks } = useTypedSelector((state) => state.track);
	const [query, setQuery] = useState('');
	const dispatch = useDispatch() as NextThunkDispatch;
	const [timer, setTimer] = useState(null);

	if (error) {
		return (
			<MainLayout>
				<h1>{error}</h1>
			</MainLayout>
		);
	}

	const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
		if (timer) {
			clearTimeout(timer);
		}
		setTimer(
			setTimeout(async () => {
				await dispatch(searchTracks(e.target.value));
			}, 1500)
		);
	};

	return (
		<MainLayout>
			<Grid container justifyContent='center'>
				<Card style={{ width: '900px' }}>
					<Box p={5}>
						<Grid container justifyContent='space-between'>
							<h1>Список треков</h1>
							<Button
								onClick={() => router.push('tracks/create')}
							>
								Загрузить
							</Button>
						</Grid>
					</Box>
					<TextField fullWidth value={query} onChange={search} />
					<TrackList tracks={tracks} />
				</Card>
			</Grid>
		</MainLayout>
	);
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (): Promise<any> => {
		const dispatch = store.dispatch as NextThunkDispatch;
		await dispatch(fetchTracks());
	}
);
