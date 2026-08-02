import {
    CONFIG
}
from "./config.js";



let analyser;

let animationFrame;



export function initializeVisualizer() {


    const audio =
        document.getElementById(
            "audio-player"
        );


    const container =
        document.getElementById(
            "visualizer"
        );



    for (
        let i = 0;
        i < CONFIG.visualizerBars;
        i++
    ) {


        const bar =
            document.createElement(
                "div"
            );


        bar.className =
            "visualizer-bar";


        container.appendChild(
            bar
        );

    }



    const context =
        new AudioContext();


    const source =
        context.createMediaElementSource(
            audio
        );


    analyser =
        context.createAnalyser();



    analyser.fftSize =
        128;


    source.connect(
        analyser
    );


    analyser.connect(
        context.destination
    );


    animate();

}



function animate() {


    animationFrame =
        requestAnimationFrame(
            animate
        );


    if (
        !analyser
    )
        return;



    const data =
        new Uint8Array(
            analyser.frequencyBinCount
        );


    analyser.getByteFrequencyData(
        data
    );


    const bars =
        document.querySelectorAll(
            ".visualizer-bar"
        );



    bars.forEach(
        (bar,index)=> {


            const value =
                data[index] || 0;


            bar.style.height =
                Math.max(
                    5,
                    value / 2
                )
                +
                "px";


        }
    );

}
