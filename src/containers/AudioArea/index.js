import OperationArea from "../OperationArea";
import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import {useEffect, useState} from "react";

const AudioArea = () => {

    const [waveSurfer, setWaveSurfer] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        setWaveSurfer(WaveSurfer.create({
            container: '#waveform',
            waveColor: 'violet',
            plugins: [
                TimelinePlugin.create({
                    container: '#wave-timeline'
                })
            ]
        }))
    }, [])

    useEffect(() => {
        if(waveSurfer) {
            console.log("useEffect of ws called!");
            document.getElementById("fileinput").addEventListener('change', function(e){
                var file = this.files[0];

                if (file) {
                    var reader = new FileReader();

                    reader.onload = function (evt) {
                        // Create a Blob providing as first argument a typed array with the file buffer
                        var blob = new window.Blob([new Uint8Array(evt.target.result)]);

                        // Load the blob into Wavesurfer
                        waveSurfer.loadBlob(blob);
                    };

                    reader.onerror = function (evt) {
                        console.error("An error ocurred reading the file: ", evt);
                    };

                    // Read File as an ArrayBuffer
                    reader.readAsArrayBuffer(file);
                }
            }, false);
        }
    }, [waveSurfer])

    const togglePlayPause = () => {
        waveSurfer.playPause();
        setIsPlaying(!isPlaying);
    }

    return (
        <div className="AudioArea">
            <div id="waveform">
                <div id="wave-timeline"></div>
            </div>
            <input type="file" id="fileinput" />
            <button
                className="btn btn-primary btn-space"
                onClick={() => togglePlayPause()}
            >
                Play/Pause
            </button>
            <OperationArea/>
        </div>
    )
}

export default AudioArea
