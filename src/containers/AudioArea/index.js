import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import styled from "styled-components";
import { connect } from "react-redux";
import { Marker, WaveForm, WaveSurfer } from "wavesurfer-react";
import "./styles.css";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min";
import MarkersPlugin from "wavesurfer.js/src/plugin/markers";
import FileSaver from 'file-saver';
import { UPDATE_CURRENT_TIME } from "../OperationArea/actions";

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

function AudioArea({ originalTime, updateCurrentTime, anchors }) {

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
    const wavesurferRef = useRef();
    const handleWSMount = useCallback(
        (waveSurfer) => {
            if (waveSurfer.markers) {
                waveSurfer.clearMarkers();
            }

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


    //generating exisiting and new markers
    //by alice
    const existingMarkers = anchors.map((anchor) => {
        return {
            time: parseFloat(anchor.timestamp.slice(0, -1)),
            label: anchor.timestamp,
            color: "#ff990a",
            position: "top"
        }
    })

    const [markers, setMarkers] = useState([

        ...existingMarkers,
        {
            time: 5.5,
            label: "V1",
            color: "#ff990a",
            draggable: true
        },

        // {
        //     time: 10,
        //     label: "V2",
        //     color: "#00ffcc",
        //     position: "top"
        // }

    ]);

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

    useEffect(() => {
        // setMarkers([...existingMarkers]);
        if (!wavesurferRef.current) {
            setMarkers([...existingMarkers]);
            return;
        }
        const r = generateNum(0, 255);
        const g = generateNum(0, 255);
        const b = generateNum(0, 255);
        const currentTime = wavesurferRef.current.getCurrentTime()
        setMarkers([
            ...existingMarkers,
            {
                //label: `@${currentTime.toFixed(1)}s`,
                time: currentTime,
                color: `rgba(${r}, ${g}, ${b}, 0.5)`,
                //draggable: true
            }
        ]);
        console.log("SETTING markers are: ", markers);

    }, [existingMarkers.length, anchors]);
    //end generating markers





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
        return currentTime.toFixed(2);
    }, [wavesurferRef]);


    //testing delete
    const [m, setM] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const [f, setF] = useState(false);

    const testDelete = () => {
        console.log("test delete");
        setF(!f);
        console.log("f is: ", f);
        console.log("now markers are: ", markers);
        console.log("now existing are : ", existingMarkers);
    }

    useEffect(() => {
        setM(m.filter(i => i !== 1));
        // console.log("setting");
        // console.log("m is: ", m);
    }, [f])
    //end testing delete



    //by alice
    const [currentTime, setCurrentTime] = useState(originalTime);
    const [event, setEvent] = useState(false);

    const getReady = () => {
        event === false ? setEvent(true) : setEvent(false);
        // setEvent(true);
    }

    useEffect(() => {
        if (wavesurferRef.current) {
            const tmp = wavesurferRef.current.getCurrentTime();
            setCurrentTime(`${tmp.toFixed(1)}s`);
            updateCurrentTime(currentTime);
        }
        // console.log("ALICE currentTime is  : ", currentTime);
    }, [currentTime, event])
    //end by alice


    return (
        <div>
            {/*<div className="progress">*/}
            {/*    <div className="progress-bar progress-bar-striped progress-bar-animated"*/}
            {/*         role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"*/}
            {/*         style={{width: '75%'}}></div>*/}
            {/*</div>*/}
            <div className="AudioArea">
                {url ?
                    <WaveSurfer plugins={plugins} onMount={handleWSMount}>
                        <WaveForm id="waveform" cursorColor="transparent">
                            {/*<WaveForm id="waveform" cursorColor="#fff">*/}
                            {markers.map((marker, index) => {
                                return (
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
                                );
                            })}
                        </WaveForm>
                        <div id="timeline" />
                    </WaveSurfer>
                    : console.log("no audio file yet")}

                <Buttons>
                    {/*<Button onClick={getReady}>Get current time</Button>*/}
                    <Button onClick={addMarker}>Add Marker</Button>
                    <Button onClick={play}>Play / Pause</Button>
                    <Button onClick={removeLastMarker}>Remove last marker</Button>
                    <Button onClick={shuffleLastMarker}>Shuffle last marker</Button>
                    <Button onClick={toggleTimeline}>Toggle timeline</Button>
                    <Button onClick={testDelete}>TEST</Button>
                    <input type="file" name="file" ref={inputFile} style={{ display: 'none' }}
                        accept='audio/*' onChange={changeHandler} />
                    <div>
                        <Button onClick={handleSubmission} >Upload Audio</Button>
                    </div>
                </Buttons>
            </div>
        </div>
    );
}

const stpm = (state) => {
    return {
        originalTime: state.textareaReducer.currentTime,
        anchors: state.textareaReducer.anchors,
    };
};

const dtpm = (dispatch) => {
    return {
        updateCurrentTime: (currentTime) =>
            dispatch({
                type: UPDATE_CURRENT_TIME,
                currentTime: currentTime,
            }),

    };
};

// export default AudioArea;

export default connect(stpm, dtpm)(AudioArea);

// export default AudioArea;
