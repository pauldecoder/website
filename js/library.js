import { CONFIG } from "./config.js";



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



function openPlaylist(id) {


    const playlist =
        playlists.find(
            item =>
            item.id === id
        );


    if (!playlist)
        return;


    document.getElementById(
        "library-view"
    )
    .classList.add(
        "hidden"
    );


    document.getElementById(
        "playlist-view"
    )
    .classList.remove(
        "hidden"
    );


    document.getElementById(
        "playlist-title"
    )
    .textContent =
        playlist.name;


    document.getElementById(
        "playlist-artwork"
    )
    .src =
        playlist.artwork ||
        CONFIG.defaultArtwork;


}
