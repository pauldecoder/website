import { CONFIG } from "./config.js";

import {
    loadPlaylist,
    playSong
}
from "./player.js";



let playlists = [];



export async function loadLibrary() {


    const response =
        await fetch(
            "./data/playlists.json"
        );


    const data =
        await response.json();


    playlists =
        data.playlists;


    renderPlaylistCards();

    renderSidebar();


    return playlists;

}



export function getPlaylists() {

    return playlists;

}



function renderPlaylistCards() {


    const container =
        document.getElementById(
            "playlist-grid"
        );


    container.innerHTML = "";


    playlists.forEach(
        playlist => {


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "playlist-card";


            card.innerHTML = `

                <img src="${playlist.artwork || CONFIG.defaultArtwork}">

                <div class="playlist-card-content">

                    <h3>
                    ${playlist.name}
                    </h3>

                    <p>
                    ${playlist.songs.length} Songs
                    </p>


                    <button>
                    PLAY
                    </button>

                </div>

            `;


            card.querySelector(
                "button"
            )
            .onclick = () => {

                openPlaylist(
                    playlist.id
                );

            };


            container.appendChild(card);


        }

    );

}



function renderSidebar() {


    const nav =
        document.getElementById(
            "playlist-navigation"
        );


    nav.innerHTML = "";


    playlists.forEach(
        playlist => {


            const button =
                document.createElement(
                    "button"
                );


            button.textContent =
                playlist.name;


            button.onclick =
                () =>
                openPlaylist(
                    playlist.id
                );


            nav.appendChild(button);

        }

    );

}



async function openPlaylist(id) {

    const playlistSummary =
        playlists.find(
            item => item.id === id
        );

    if (!playlistSummary)
        return;

    const response =
        await fetch(
            playlistSummary.playlistFile
        );

    const playlist =
        await response.json();

    document
        .getElementById("library-view")
        .classList.add("hidden");

    document
        .getElementById("playlist-view")
        .classList.remove("hidden");

    document
        .getElementById("playlist-title")
        .textContent =
        playlist.title;

    document
        .getElementById("playlist-artwork")
        .src =
        playlist.artwork ||
        CONFIG.defaultArtwork;

    document
        .getElementById("playlist-information")
        .textContent =
        `${playlist.songs.length} SONGS`;

    const songList =
        document.getElementById("song-list");

    songList.innerHTML = "";

    playlist.songs.forEach(
        (song, index) => {

            const row =
                document.createElement("div");

            row.className =
                "song-row";

            row.innerHTML = `

                <span>${String(index + 1).padStart(2,"0")}</span>

                <div>

                    <strong>${song.title}</strong>

                    <small>${song.artist}</small>

                </div>

                <button>PLAY</button>

            `;

            row.querySelector("button")
                .onclick = () => {

                    loadPlaylist(playlist);

                    playSong(index);

                };

            songList.appendChild(row);

        }

    );

}
