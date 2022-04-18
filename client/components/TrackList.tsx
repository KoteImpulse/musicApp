import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/system';
import React, { FC } from 'react';
import { ITrack } from '../type/track';
import TrackItem from './TrackItem';

interface TrackListProps {
	tracks: ITrack[];
}

const TrackList: FC<TrackListProps> = ({ tracks }) => {
	return (
		<Grid container direction='column'>
			<Box p={3}>
				{tracks.map((track) => (
					<TrackItem key={track._id} track={track} />
				))}
			</Box>
		</Grid>
	);
};

export default TrackList;
