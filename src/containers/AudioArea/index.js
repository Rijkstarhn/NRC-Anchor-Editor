import OperationArea from "../OperationArea";
import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import MarkersPlugin from "wavesurfer.js/src/plugin/markers";
import {useEffect, useState} from "react";
import actions from "../OperationArea/actions";
import {connect} from "react-redux";
import usePrevious from "../../usePrevious";


const AudioArea = (
    {
        anchors,
        currentTime,
        updateCurrentAnchorTime,
        currentLocation,
        isAddingAnchor,
        isDeletingAnchor,
        deleteConfirmHits,
        cancelButtonHits,
    }) => {

    const [waveSurfer, setWaveSurfer] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)

    // initialize wave surfer
    useEffect(() => {
        setWaveSurfer(WaveSurfer.create({
            container: '#waveform',
            waveColor: '#0275d8',
            plugins: [
                TimelinePlugin.create({
                    container: '#wave-timeline'
                }),
                MarkersPlugin.create({
                    container: '#wave-marker'
                })
            ]
        }))
    }, [])

    // subscribe events to wave surfer
    useEffect(() => {
        if(waveSurfer) {
            document.getElementById("file-input-audio").addEventListener('change', function(e){
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
            // register onSeek event to get the 'real' current time, this can be referred from official doc
            waveSurfer.on('seek', function () {
                let currentTime = waveSurfer.getCurrentTime().toFixed(2);
                updateCurrentAnchorTime(`${currentTime}s`);
            });
        }
    }, [waveSurfer])

    useEffect(() => {
        if (waveSurfer) {
            for (let i = 0; i < anchors.length; i++) {
                let timestamp = parseFloat(anchors[i].timestamp.slice(0, -1));
                let location = anchors[i].location;
                // to avoid duplicate markers with same time stamp
                if (document.getElementsByClassName(`marker-timestamp-${timestamp}`).length === 0) {
                    waveSurfer.addMarker({time: timestamp,  color: "red", position: "top"});
                }
                let addedMarkers = document.querySelectorAll('marker');
                for (let i = 0; i < addedMarkers.length; i++) {
                    if (!addedMarkers[i].className.includes('timestamp')) {
                        addedMarkers[i].classList.add(`marker-timestamp-${timestamp}`);
                        addedMarkers[i].classList.add(`marker-location-${location}`);
                    }
                }
            }
        }
    }, [anchors])

    const prevCurrentTime = usePrevious(currentTime);

    useEffect(() => {
        if (isDeletingAnchor) {
            let markers = document.querySelectorAll('marker');
            for (let i = 0; i < markers.length; i++) {
                if (markers[i].classList.contains(`marker-timestamp-${parseFloat(currentTime.slice(0, -1))}`)) {
                    markers[i].querySelector('polygon').style.fill = 'green';
                }
                if (markers[i].classList.contains(`marker-timestamp-${parseFloat(prevCurrentTime.slice(0, -1))}`)) {
                    markers[i].querySelector('polygon').style.fill = 'red';
                }
            }
        }
    }, [currentTime])

    useEffect(() => {
        let markers = document.querySelectorAll('marker');
        for (let i = 0; i < markers.length; i++) {
            if (markers[i].className.includes(`marker-timestamp-${parseFloat(prevCurrentTime.slice(0, -1))}`)) {
                markers[i].remove();
            }
        }
    }, [deleteConfirmHits])

    useEffect(() => {
        if (!isAddingAnchor && !isDeletingAnchor && cancelButtonHits > 0) {
            // Cancel previous currentLocation span.
            let currentAnchor = document.getElementsByClassName(
                `marker-timestamp-${parseFloat(prevCurrentTime.slice(0, -1))}`
            )[0];
            if (currentAnchor) {
                // if it's deleting anchor
                let currentPolygon = currentAnchor.querySelector('polygon')
                console.log("currentAnchor", currentPolygon.style.fill);
                if (currentPolygon.style.fill === 'green') {
                    console.log("true");
                    currentPolygon.removeAttribute('style');
                    currentPolygon.style.fill = 'red';
                }
            }
        }
    }, [cancelButtonHits]);

    const togglePlayPause = () => {
        waveSurfer.playPause();
        setIsPlaying(!isPlaying);
    }

    const speedUpPlayback1 = () => {
        waveSurfer.setPlaybackRate(0.5);
    }

    const speedUpPlayback2 = () => {
        waveSurfer.setPlaybackRate(0.7);
    }

    const speedUpPlayback3 = () => {
        waveSurfer.setPlaybackRate(0.8);
    }

    const speedUpPlayback4 = () => {
        waveSurfer.setPlaybackRate(0.9);
    }

    const normalPlayback = () => {
        waveSurfer.setPlaybackRate(1);
    }

    return (
        <div className="AudioArea">
            <div id="waveform">
                <div id="wave-timeline" className="audio-control-area"></div>
            </div>
            <div className="audio-operation-area">
                <button
                    className="btn btn-primary btn-space"
                    onClick={() => togglePlayPause()}
                >
                    Play/Pause
                </button>
                <button
                    className="btn btn-primary btn-space"
                    onClick={() => normalPlayback()}
                >
                    Normal Speed
                </button>
                <button
                    className="btn btn-primary btn-space"
                    onClick={() => speedUpPlayback1()}
                >
                    0.5X
                </button>
                <button
                    className="btn btn-primary btn-space"
                    onClick={() => speedUpPlayback2()}
                >
                    0.7X
                </button>
                <button
                    className="btn btn-primary btn-space"
                    onClick={() => speedUpPlayback3()}
                >
                    0.8X
                </button>
                <button
                    className="btn btn-primary btn-space"
                    onClick={() => speedUpPlayback4()}
                >
                    0.9X
                </button>
            </div>
            <OperationArea/>
            <div className="input-group audio-upload custom-file-button">
                <label className="input-group-text" htmlFor="file-input-audio">Choose Audio File</label>
                <input
                    type="file"
                    className="form-control"
                    id="file-input-audio"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"
                />
                <button
                    className="btn btn-outline-secondary upload-file-button"
                    type="button"
                    id="inputGroupFileAddon04"
                >
                    Upload
                </button>
            </div>
        </div>
    )
}

const stpm = (state) => {
    return {
        text: state.textareaReducer.text,
        anchors: state.textareaReducer.anchors,
        currentTime: state.textareaReducer.currentTime,
        currentLocation: state.textareaReducer.currentLocation,
        isAddingAnchor: state.textareaReducer.isAddingAnchor,
        isDeletingAnchor: state.textareaReducer.isDeletingAnchor,
        cancelButtonHits: state.textareaReducer.cancelButtonHits,
        deleteConfirmHits: state.textareaReducer.deleteConfirmHits,
    };
};

const dtpm = (dispatch) => {
    return {
        updateCurrentAnchorLocation: (currentLocation) =>
            actions.updateCurrentAnchorLocation(dispatch, currentLocation),
        updateCurrentAnchorTime: (currentTime) => {
            actions.updateCurrentAnchorTime(dispatch, currentTime)
        },
    };
};

export default connect(stpm, dtpm)(AudioArea);
