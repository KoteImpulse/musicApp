import { TrackAction, TrackActionTypes, TrackState } from '../../type/track';

const initialState: TrackState = {
	tracks: [],
	error: '',
};

export const trackReduset = (
	state = initialState,
	action: TrackAction
): TrackState => {
	switch (action.type) {
		case TrackActionTypes.FETCH_TRACKS_ERROR:
			return { ...state, error: action.payload };
		case TrackActionTypes.FETCH_TRACKS:
			return { ...state, error: '', tracks: action.payload };
		default:
			return state;
	}
};
