import { Grid, IconButton } from '@material-ui/core';
import { Pause, PlayArrow, VolumeUp } from '@material-ui/icons';
import React, { FC, useEffect, useState } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import styles from '../styles/Player.module.scss';
import { ITrack } from '../type/track';
import TrackProgress from './TrackProgress';

let audio;

const Player: FC = () => {
	const track: ITrack = {
		_id: '3',
		name: 'Track 3',
		artist: 'Artist 3',
		text: 'Text 3',
		listens: 5,
		audio: 'http://localhost:5000/audio/78871a23-b608-4d8a-b950-4a6e9251c00e.m4a',
		picture:
			'http://localhost:5000/image/954ac51a-a5ca-48af-be80-31188ff1b864.jpg',
		comments: [],
	};

	const { active, pause, volume, currentTime, duration } = useTypedSelector(
		(state) => state.player
	);
	const {
		playTrack,
		pauseTrack,
		setCurrentTime,
		setActiveTrack,
		setDuration,
		setVolume,
	} = useActions();

	useEffect(() => {
		if (!audio) {
			audio = new Audio();
		} else {
			setAudio();
			play();
		}
	}, [active]);

	const setAudio = () => {
		if (active) {
			audio.src = 'http://localhost:5000/' + active.audio;
			audio.volume = volume / 100;
			audio.onloadedmetadata = () => {
				setDuration(Math.ceil(audio.duration));
			};
			audio.ontimeupdate = () => {
				setCurrentTime(Math.ceil(audio.currentTime));
			};
		}
	};

	const play = () => {
		if (pause) {
			playTrack();
			audio.play();
		} else {
			pauseTrack();
			audio.pause();
		}
	};

	const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
		audio.volume = Number(e.target.value) / 100;
		setVolume(Number(e.target.value));
	};
	const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
		audio.currentTime = Number(e.target.value);
		setCurrentTime(Number(e.target.value));
	};

	if (!active) {
		return null;
	}

	return (
		<div className={styles.player}>
			<IconButton onClick={play}>
				{pause ? <PlayArrow /> : <Pause />}
			</IconButton>
			<Grid
				container
				direction='column'
				style={{ width: 200, margin: '0 20px' }}
			>
				<div>{active?.name}</div>
				<div style={{ fontSize: 12, color: 'gray' }}>
					{active?.artist}
				</div>
			</Grid>
			<TrackProgress
				left={currentTime}
				right={duration}
				onChange={changeCurrentTime}
			/>
			<VolumeUp style={{ marginLeft: 'auto' }} />
			<TrackProgress left={volume} right={100} onChange={changeVolume} />
		</div>
	);
};

export default Player;
