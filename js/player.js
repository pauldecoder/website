import {
    updateState,
    recordPlay,
    getSavedState
}
from "./storage.js";


import {
    updateMediaSession
}
from "./media-session.js";



const audio =
    document.getElementById(
        "audio-player"
    );


const playButton =
    document.getElementById(
        "play-button"
    );


const previousButton =
    document.getElementById(
        "previous-button"
    );


const nextButton =
    document.getElementById(
        "next-button"
    );


const progressBar =
    document.getElementById(
        "progress-bar"
    );


const currentTime =
    document.getElementById(
        "current-time"
    );


const durationDisplay =
    document.getElementById(
        "duration"
    );



let currentPlaylist = null;

let currentIndex = 0;



export function initializePlayer() {


    playButton.onclick =
        togglePlay;


    previousButton.onclick =
        previousSong;


    nextButton.onclick =
        nextSong;



    audio.addEventListener(
        "timeupdate",
        updateProgress
    );


    audio.addEventListener(
        "loadedmetadata",
        () => {

            durationDisplay.textContent =
                formatTime(
                    audio.duration
                );

        }
    );



    progressBar.addEventListener(
        "input",
        () => {

            audio.currentTime =
                (
                    progressBar.value /
                    100
                )
                *
                audio.duration;

        }
    );


    audio.addEventListener(
        "ended",
        nextSong
    );



}



export function loadPlaylist(
    playlist
) {

    currentPlaylist =
        playlist;


    currentIndex =
        0;


    loadSong();

}



export function loadSong() {


    if (
        !currentPlaylist
    )
        return;



    const song =
        currentPlaylist.songs[
            currentIndex
        ];


    audio.src =
        song.sources.audio;


    document.getElementById(
        "current-title"
    )
    .textContent =
        song.title;


    document.getElementById(
        "current-artist"
    )
    .textContent =
        song.artist;



    updateMediaSession(
        song
    );


    recordPlay(
        currentPlaylist.id,
        currentIndex
    );

}



function togglePlay() {


    if (
        audio.paused
    ) {

        audio.play();

        playButton
        .querySelector("img")
        .src =
        "./assets/icons/pause.svg";


    }
    else {

        audio.pause();

        playButton
        .querySelector("img")
        .src =
        "./assets/icons/play.svg";

    }

}



function nextSong() {


    if (
        !currentPlaylist
    )
        return;



    currentIndex++;


    if (
        currentIndex >=
        currentPlaylist.songs.length
    ) {

        currentIndex = 0;

    }


    loadSong();

    audio.play();

}



function previousSong() {


    if (
        audio.currentTime > 5
    ) {

        audio.currentTime = 0;

        return;

    }



    currentIndex--;


    if (
        currentIndex < 0
    ) {

        currentIndex =
            currentPlaylist.songs.length - 1;

    }


    loadSong();

    audio.play();

}



function updateProgress() {


    if (
        !audio.duration
    )
        return;


    progressBar.value =
        (
            audio.currentTime /
            audio.duration
        )
        *
        100;


    currentTime.textContent =
        formatTime(
            audio.currentTime
        );

}



function formatTime(seconds) {


    if (
        isNaN(seconds)
    )
        return "0:00";


    const minutes =
        Math.floor(
            seconds / 60
        );


    const remaining =
        Math.floor(
            seconds % 60
        )
        .toString()
        .padStart(
            2,
            "0"
        );


    return `${minutes}:${remaining}`;

}



export function playSong(index) {


    if (
        !currentPlaylist
    )
        return;


    currentIndex =
        index;


    loadSong();


    audio.play();


}
