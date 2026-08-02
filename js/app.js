import {
    loadLibrary
}
from "./library.js";

import {
    initializePlayer
}
from "./player.js";

import {
    initializeVisualizer
}
from "./visualizer.js";

import {
    initializeMediaSession
}
from "./media-session.js";



async function startApp() {


    await loadLibrary();


    initializePlayer();


    initializeVisualizer();


    initializeMediaSession();



    if (
        "serviceWorker" in navigator
    ) {

        navigator.serviceWorker.register(
            "./service-worker.js"
        );

    }


}



startApp();
