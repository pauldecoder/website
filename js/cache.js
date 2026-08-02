export async function preloadAudio(
    url
) {


    try {


        await fetch(
            url,
            {
                mode:
                "no-cors"
            }
        );


    }
    catch(error) {


        console.warn(
            "Preload failed:",
            error
        );


    }

}
