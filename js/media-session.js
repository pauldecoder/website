export function initializeMediaSession() {


    if (
        !("mediaSession" in navigator)
    )
        return;



    navigator.mediaSession.setActionHandler(
        "play",
        () => {

            document
            .getElementById(
                "audio-player"
            )
            .play();

        }
    );



    navigator.mediaSession.setActionHandler(
        "pause",
        () => {

            document
            .getElementById(
                "audio-player"
            )
            .pause();

        }
    );



    navigator.mediaSession.setActionHandler(
        "previoustrack",
        () => {

            document
            .getElementById(
                "previous-button"
            )
            .click();

        }
    );



    navigator.mediaSession.setActionHandler(
        "nexttrack",
        () => {

            document
            .getElementById(
                "next-button"
            )
            .click();

        }
    );

}



export function updateMediaSession(
    song
) {


    if (
        !("mediaSession" in navigator)
    )
        return;



    navigator.mediaSession.metadata =
        new MediaMetadata({

            title:
                song.title,

            artist:
                song.artist,


            artwork: [

                {

                    src:
                    song.artwork ||
                    "./assets/artwork/default-cover.png",

                    sizes:
                    "512x512",

                    type:
                    "image/png"

                }

            ]

        });


}
