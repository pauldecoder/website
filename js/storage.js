const STORAGE_KEY =
    "pd_playlist_library_state";



function getState() {

    const data =
        localStorage.getItem(STORAGE_KEY);


    return data
        ? JSON.parse(data)
        : {};

}



function saveState(state) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
    );

}



export function updateState(values) {

    const state =
        getState();


    saveState({
        ...state,
        ...values
    });

}



export function getSavedState() {

    return getState();

}



export function recordPlay(
    playlistId,
    songIndex
) {


    const state =
        getState();


    if (!state.statistics) {

        state.statistics = {};

    }


    if (!state.statistics[playlistId]) {

        state.statistics[playlistId] = {

            playCount: 0,
            lastPlayed: null

        };

    }


    state.statistics[playlistId].playCount++;

    state.statistics[playlistId].lastPlayed =
        new Date().toISOString();


    state.lastPlaylist =
        playlistId;


    state.lastSong =
        songIndex;


    saveState(state);

}
