import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import styled from "styled-components";
import { connect } from "react-redux";
import { Marker, WaveForm, WaveSurfer } from "wavesurfer-react";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min";
import MarkersPlugin from "wavesurfer.js/src/plugin/markers";
import FileSaver from 'file-saver';
import { UPDATE_CURRENT_TIME, SET_DELETE_SIGNAL, SET_ADD_SIGNAL } from "../OperationArea/actions";
import OperationArea from "../OperationArea";


const Buttons = styled.div`
  display: inline-block;
`;

const Button = styled.button``;

/**
 * @param min
 * @param max
 * @returns {*}
 */
function generateNum(min, max) {
    return Math.random() * (max - min + 1) + min;
}

/**
 * @param distance
 * @param min
 * @param max
 * @returns {([*, *]|[*, *])|*[]}
 */
function generateTwoNumsWithDistance(distance, min, max) {
    const num1 = generateNum(min, max);
    const num2 = generateNum(min, max);
    // if num2 - num1 < 10
    if (num2 - num1 >= 10) {
        return [num1, num2];
    }
    return generateTwoNumsWithDistance(distance, min, max);
}

function AudioArea({ originalTime, targetLocation, updateCurrentTime,
    anchors, isDeletingAnchor, deleteSignal, setDeleteSignal, addSignal, setAddSignal }) {

    const [timelineVis, setTimelineVis] = useState(true);

    const plugins = useMemo(() => {
        return [
            // {
            //     plugin: RegionsPlugin,
            //     options: { dragSelection: true }
            // },
            timelineVis && {
                plugin: TimelinePlugin,
                options: {
                    container: "#timeline"
                }
            },
            {
                plugin: MarkersPlugin,
                options: {
                    markers: [{ draggable: true }]
                }
            }
        ].filter(Boolean);
    }, [timelineVis]);

    const toggleTimeline = useCallback(() => {
        setTimelineVis(!timelineVis);
    }, [timelineVis]);

    // playing status flag
    const [playing, setPlay] = useState(false);

    //uploading audio
    //by alice
    const inputFile = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [url, setUrl] = useState('');

    useEffect(() => {
        if (selectedFile) {
            setUrl(selectedFile);
        }
    }, [url, selectedFile]);

    const handleSubmission = () => {
        // console.log("handling submitting");
        inputFile.current.click();
    }

    const changeHandler = (event) => {
        setSelectedFile(URL.createObjectURL(event.target.files[0]));
        // console.log("THIS IS URL: ", URL.createObjectURL(event.target.files[0]));
        setIsFilePicked(true);
        console.log(event.target.files[0].name);
        // console.log("now selected file is: ", selectedFile);
        // console.log("now isFilePicked is: ", isFilePicked);
    };
    //end by alice


    // use wavesurfer ref to pass it inside useCallback
    // so it will use always the most fresh version of markers list
    const [markers, setMarkers] = useState([]);

    const wavesurferRef = useRef();
    const handleWSMount = useCallback(
        (waveSurfer) => {
            // if (waveSurfer.markers) {
            //     waveSurfer.clearMarkers();
            //     console.log("🌸waveSurfer.markers: ", waveSurfer.markers);
            // }

            wavesurferRef.current = waveSurfer;

            if (wavesurferRef.current && url) {
                setPlay(false);
                wavesurferRef.current.load(url);

                console.log(wavesurferRef.current)
                console.log("now url is: ", url);

                wavesurferRef.current.on("ready", () => {
                    console.log("WaveSurfer is ready");
                });

                wavesurferRef.current.on("loading", (data) => {
                    console.log("loading --> ", data);
                });

                // When you use wavesurfer.on('seek') and
                // calling getCurrentTime() you get the time AFTER it seeked due to mouse clicking.
                wavesurferRef.current.on('seek', () => {
                    updateCurrentTime(`${getCurrentTime()}s`);
                });

                if (window) {
                    window.surferidze = wavesurferRef.current;
                }
            }
        },
        [url, isFilePicked]
    );



    //test no on mount
    // useEffect(() => {
    //     if (wavesurferRef.current && url) {
    //         // once the waveform is ready


    //         wavesurferRef.current.on("ready", () => {
    //             console.log("🌸WaveSurfer is ready");
    //         });
    //         wavesurferRef.current = waveSurfer;



    //         // // if multiple regions are created, then remove all the previous regions so that only 1 is present at any given time
    //         // wavesurferObj.on('region-updated', (region) => {
    //         // 	const regions = region.wavesurfer.regions.list;
    //         // 	const keys = Object.keys(regions);
    //         // 	if (keys.length > 1) {
    //         // 		regions[keys[0]].remove();
    //         // 	}
    //         // });
    //     }
    // }, [url, isFilePicked]);



    //generating exisiting and new markers
    //by alice
    // const existingMarkers = anchors.map((anchor) => {
    //     //console.log("anchor", anchor);
    //     return {
    //         time: parseFloat(anchor.timestamp.slice(0, -1)),
    //         // label: anchor.timestamp,
    //         color: "red",
    //         position: "top",
    //         // id: anchor.location,
    //     }
    // })

    // const [markers, setMarkers] = useState([...existingMarkers]);
    //where markers were created before


    //temporarily we do not use this function
    const addMarker = useCallback(() => {
        if (!wavesurferRef.current) {
            return;
        }
        const r = generateNum(0, 255);
        const g = generateNum(0, 255);
        const b = generateNum(0, 255);
        const currentTime = wavesurferRef.current.getCurrentTime()

        setMarkers([
            ...markers,
            {
                //label: `@${currentTime.toFixed(1)}s`,
                time: currentTime,
                color: `rgba(${r}, ${g}, ${b}, 0.5)`,
                //draggable: true
            }
        ]);
    }, [markers, wavesurferRef]);





    //by alice
    const [currentTime, setCurrentTime] = useState(originalTime);

    useEffect(() => {
        if (wavesurferRef.current) {
            const tmp = wavesurferRef.current.getCurrentTime();
            setCurrentTime(`${tmp.toFixed(1)}s`);
            updateCurrentTime(currentTime);
        }
    }, [currentTime])
    //end by alice

    //where we add new markers and delete markers 
    // useEffect(() => {
    //     console.log("AUDIO useEffect called!");
    //     console.log("delete signal is: ", deleteSignal);
    //     console.log("addSignal is: ", addSignal);

    //     if (!wavesurferRef.current) {
    //         console.log("🐶 no wavesurfer", existingMarkers);
    //         setMarkers([...existingMarkers]);
    //         return;
    //     }

    //     if (deleteSignal) {
    //         console.log("🐱AUDIO isDeletingAnchor is true!");
    //         const targetNumber = parseInt(targetLocation);
    //         const newMarkers = markers.filter((marker) => marker.time !== parseFloat(originalTime.slice(0, -1)));
    //         console.log("originalTime: ", originalTime);

    //         setMarkers([
    //             ...newMarkers,
    //         ]);
    //         setDeleteSignal(false);
    //         console.log("🐱AUDIO newMarkers: ", newMarkers);
    //         console.log("🐱AUDIO existing markers: ", existingMarkers);
    //         return;
    //     }

    //     if (addSignal) {
    //         console.log("AUDIO isAddingAnchor is true!");
    //         const currentTime = wavesurferRef.current.getCurrentTime()
    //         setMarkers([
    //             ...existingMarkers,
    //             {
    //                 // label: `@${currentTime.toFixed(1)}s`,
    //                 time: parseFloat(currentTime.toFixed(1)),
    //                 color: "red",
    //                 position: "top",
    //                 // id: targetLocation,
    //                 //draggable: true
    //             }
    //         ]);
    //         console.log("SETTING markers are: ", markers);
    //         setAddSignal(false);
    //     }

    // }, [existingMarkers.length, anchors, deleteSignal, addSignal]);
    //end generating markers 

    //test
    useEffect(() => {
        console.log("AUDIO useEffect called!");
        // console.log("delete signal is: ", deleteSignal);
        // console.log("addSignal is: ", addSignal);

        // if (!wavesurferRef.current) {
        //     console.log("🐶 no wavesurfer", existingMarkers);
        //     setMarkers([...existingMarkers]);
        //     return;
        // }
        setMarkers(anchors.map((anchor) => {
            //console.log("anchor", anchor);
            return {
                time: parseFloat(anchor.timestamp.slice(0, -1)),
                // label: anchor.timestamp,
                color: "red",
                position: "top",
                // id: anchor.location,
            }
        }))


        // if (deleteSignal) {
        //     console.log("🐱AUDIO isDeletingAnchor is true!");
        //     const targetNumber = parseInt(targetLocation);
        //     const newMarkers = markers.filter((marker) => marker.time !== parseFloat(originalTime.slice(0, -1)));
        //     console.log("originalTime: ", originalTime);

        //     setMarkers([
        //         ...newMarkers,
        //     ]);
        //     setDeleteSignal(false);
        //     console.log("🐱AUDIO newMarkers: ", newMarkers);
        //     console.log("🐱AUDIO existing markers: ", existingMarkers);
        //     return;
        // }

        // if (addSignal) {
        // console.log("AUDIO isAddingAnchor is true!");
        // const currentTime = wavesurferRef.current.getCurrentTime()
        // setMarkers([
        //     ...existingMarkers,
        //     {
        //         // label: `@${currentTime.toFixed(1)}s`,
        //         time: parseFloat(currentTime.toFixed(1)),
        //         color: "red",
        //         position: "top",
        //         // id: targetLocation,
        //         //draggable: true
        //     }
        // ]);
        // console.log("SETTING markers are: ", markers);
        // setAddSignal(false);
        //}

    }, [anchors]);
    //deleteSignal, addSignal


    const removeLastMarker = useCallback(() => {
        let nextMarkers = [...markers];
        nextMarkers.pop();
        setMarkers(nextMarkers);
    }, [markers]);

    const shuffleLastMarker = useCallback(() => {
        setMarkers((prev) => {
            const next = [...prev];
            let lastIndex = next.length - 1;

            const minTimestampInSeconds = 0;
            const maxTimestampInSeconds = wavesurferRef.current.getDuration();
            const distance = generateNum(0, 10);
            const [min] = generateTwoNumsWithDistance(
                distance,
                minTimestampInSeconds,
                maxTimestampInSeconds
            );

            next[lastIndex] = {
                ...next[lastIndex],
                time: min
            };

            return next;
        });
    }, [markers]);

    const play = useCallback(() => {
        // switch the playing status
        setPlay(!playing);
        wavesurferRef.current.playPause();
        updateCurrentTime(`${getCurrentTime()}s`);
        console.log("playing status --> ", playing);
    }, [playing]);

    const getCurrentTime = useCallback(() => {
        let currentTime = 0;
        if (wavesurferRef.current) {
            currentTime = wavesurferRef.current.getCurrentTime();
        }
        console.log("current --> ", currentTime);
        return currentTime.toFixed(1);
    }, [wavesurferRef]);



    const test = () => {
        console.log("🎈");
        console.log("markers: ", markers);
        console.log("anchors: ", anchors);
    }

    return (
        <div className="audio-area-style">
            {/*<div className="progress">*/}
            {/*    <div className="progress-bar progress-bar-striped progress-bar-animated"*/}
            {/*         role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"*/}
            {/*         style={{width: '75%'}}></div>*/}
            {/*</div>*/}
            <div className="AudioArea">
                {url ? //onMount={handleWSMount}
                    <WaveSurfer plugins={plugins} onMount={handleWSMount}>
                        <WaveForm id="waveform" cursorColor="transparent">
                            {/*<WaveForm id="waveform" cursorColor="#fff">*/}
                            {markers.map((marker, index) => {
                                return (
                                    <span className={marker.timestamp} key={index + 1}>
                                        <Marker
                                            key={index}
                                            {...marker}
                                            onClick={(...args) => {
                                                console.log("onClick", ...args);
                                            }}
                                            onDrag={(...args) => {
                                                console.log("onDrag", ...args);
                                            }}
                                            onDrop={(...args) => {
                                                console.log("onDrop", ...args);
                                            }}
                                        />
                                    </span>

                                );
                            })}
                        </WaveForm>
                        <div id="timeline" />
                    </WaveSurfer>
                    : console.log("no audio file yet")
                }

                <div className="audio-control-area">
                    {/*<Button onClick={getReady}>Get current time</Button>*/}
                    {/*<Button onClick={addMarker}>Add Marker</Button>*/}
                    <Button className="btn btn-primary btn-space" onClick={play}>Play / Pause</Button>
                    <Button className="btn btn-primary btn-space">2X Slower</Button>
                    <Button className="btn btn-primary btn-space">Normal Speed</Button>
                    <Button className="btn btn-primary btn-space" onClick={test}>test</Button>
                </div>
                {/*<Button onClick={removeLastMarker}>Remove last marker</Button>*/}
                {/*<Button onClick={shuffleLastMarker}>Shuffle last marker</Button>*/}
                {/*<Button onClick={toggleTimeline}>Toggle timeline</Button>*/}


                <OperationArea />
                <div className="input-group audio-upload">
                    <input
                        type="file"
                        className="form-control"
                        id="audioInput"
                        aria-describedby="audioInput"
                        aria-label="Upload"
                        ref={inputFile}
                        accept='audio/*'
                        onChange={changeHandler}
                    />
                    <button
                        className="btn btn-outline-secondary upload-file-button"
                        type="button"
                        id="audioInput"
                        onClick={() => handleSubmission()}
                    >
                        Upload Audio
                    </button>
                </div>
                {/*<input type="file" name="file" ref={inputFile} style={{ display: 'none' }}*/}
                {/*    accept='audio/*' onChange={changeHandler} />*/}
                {/*<div>*/}
                {/*    <Button onClick={handleSubmission} >Upload Audio</Button>*/}
                {/*</div>*/}
            </div>

        </div>
    );
}

const stpm = (state) => {
    return {
        originalTime: state.textareaReducer.currentTime,
        anchors: state.textareaReducer.anchors,
        targetLocation: state.textareaReducer.currentLocation,
        isDeletingAnchor: state.textareaReducer.isDeletingAnchor,
        deleteSignal: state.textareaReducer.deleteSignal,
        addSignal: state.textareaReducer.addSignal,
    };
};

const dtpm = (dispatch) => {
    return {
        updateCurrentTime: (currentTime) =>
            dispatch({
                type: UPDATE_CURRENT_TIME,
                currentTime: currentTime,
            }),
        setDeleteSignal: (deleteSignal) =>
            dispatch({
                type: SET_DELETE_SIGNAL,
                deleteSignal: deleteSignal,

            }),
        setAddSignal: (addSignal) =>
            dispatch({
                type: SET_ADD_SIGNAL,
                addSignal: addSignal,
            }),

    };
};

export default connect(stpm, dtpm)(AudioArea);

