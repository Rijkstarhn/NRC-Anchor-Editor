import OperationArea from "../OperationArea";
import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import MarkersPlugin from "wavesurfer.js/src/plugin/markers";
import {useEffect, useRef, useState} from "react";
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
            waveColor: 'violet',
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
            waveSurfer.on('seek', function () {
                console.log(waveSurfer.getCurrentTime());
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
                waveSurfer.addMarker({time: timestamp,  color: "red", position: "top"});
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

    const prevCurrentLocation = usePrevious(currentLocation);

    useEffect(() => {
        // console.log("currentLocation", currentLocation);
        // console.log("isDeletingAnchor", isDeletingAnchor);
        if (isDeletingAnchor) {
            let markers = document.querySelectorAll('marker');
            // console.log(markers);
            for (let i = 0; i < markers.length; i++) {
                if (markers[i].classList.contains(`marker-location-${currentLocation}`)) {
                    // console.log("found", markers[i]);
                    markers[i].querySelector('polygon').style.fill = 'green';
                }
                if (markers[i].classList.contains(`marker-location-${prevCurrentLocation}`)) {
                    // console.log("found", markers[i]);
                    markers[i].querySelector('polygon').style.fill = 'red';
                }
            }
        }
    }, [currentLocation])

    const prevCurrentTime = usePrevious(currentTime);

    useEffect(() => {
        let markers = document.querySelectorAll('marker');
        // console.log("prevCurrentTime", prevCurrentTime);
        for (let i = 0; i < markers.length; i++) {
            // console.log("marker", markers[i].className);
            if (markers[i].className.includes(`marker-timestamp-${parseFloat(prevCurrentTime.slice(0, -1))}`)) {
                // console.log("found", markers[i]);
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
                currentAnchor.querySelector('polygon').style.fill = 'red';
            }
        }
    }, [cancelButtonHits]);

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
