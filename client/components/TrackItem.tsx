import { Card, Grid, IconButton } from '@material-ui/core';
import React, { FC } from 'react';
import { ITrack } from '../type/track';
import styles from '../styles/TrackItem.module.scss';
import { Delete, Pause, PlayArrow } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { useActions } from '../hooks/useActions';

interface TrackItemProps {
	track: ITrack;
	active?: boolean;
}

const TrackItem: FC<TrackItemProps> = ({ track, active = false }) => {
	const router = useRouter();
	const { playTrack, pauseTrack, setActiveTrack } = useActions();
	const play = (e) => {
		e.stopPropagation();
		setActiveTrack(track);
		playTrack();
	};

	return (
		<Card
			className={styles.track}
			onClick={() => router.push(`/tracks/${track._id}`)}
		>
			<IconButton onClick={play}>
				{active ? <Pause /> : <PlayArrow />}
			</IconButton>
			<img width={70} height={70} src={"http://localhost:5000/" + track.picture} />
			<Grid
				container
				direction='column'
				style={{ width: 200, margin: '0 20px' }}
			>
				<div>{track.name}</div>
				<div style={{ fontSize: 12, color: 'gray' }}>
					{track.artist}
				</div>
			</Grid>
			{active && <div>02:42 / 03:22</div>}
			<IconButton
				style={{ marginLeft: 'auto' }}
				onClick={(e) => e.stopPropagation()}
			>
				<Delete />
			</IconButton>
		</Card>
	);
};

export default TrackItem;
