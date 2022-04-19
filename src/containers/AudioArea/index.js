import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import styled from "styled-components";
import { Marker, WaveForm, WaveSurfer } from "wavesurfer-react";
import "./styles.css";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min";
import MarkersPlugin from "wavesurfer.js/src/plugin/markers";
import FileSaver from 'file-saver';

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

function AudioArea() {

    const [timelineVis, setTimelineVis] = useState(true);

    const [markers, setMarkers] = useState([
        {
            time: 5.5,
            label: "V1",
            color: "#ff990a",
            draggable: true
        },
        {
            time: 10,
            label: "V2",
            color: "#00ffcc",
            position: "top"
        }
    ]);

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
        console.log("handling submitting");
        inputFile.current.click();
    }

    const changeHandler = (event) => {
        setSelectedFile(URL.createObjectURL(event.target.files[0]));
        console.log("THIS IS URL: ", URL.createObjectURL(event.target.files[0]));
        setIsFilePicked(true);
        console.log(event.target.files[0].name);
        console.log("now selected file is: ", selectedFile);
        console.log("now isFilePicked is: ", isFilePicked);
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

                wavesurferRef.current.load(url);

                console.log(wavesurferRef.current)
                console.log("now url is: ", url);

                wavesurferRef.current.on("ready", () => {
                    console.log("WaveSurfer is ready");
                });

                wavesurferRef.current.on("loading", (data) => {
                    console.log("loading --> ", data);
                });

                wavesurferRef.current.drawer.on('click', () => getCurrentTime());

                if (window) {
                    window.surferidze = wavesurferRef.current;
                }
            }
        },
        [url, isFilePicked]
    );

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
                label: `@${currentTime.toFixed(1)}s`,
                time: currentTime,
                color: `rgba(${r}, ${g}, ${b}, 0.5)`,
                draggable: true
            }
        ]);
    }, [markers, wavesurferRef]);

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
        wavesurferRef.current.playPause();
    }, []);

    const getCurrentTime = useCallback(() => {
        let currentTime = 0;
        if (wavesurferRef.current) {
            currentTime = wavesurferRef.current.getCurrentTime();
        }
        console.log("current --> ", currentTime);
    }, [wavesurferRef]);



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
                    : console.log("no")}

                <Buttons>
                    <Button onClick={getCurrentTime}>Get current time</Button>
                    <Button onClick={addMarker}>Add Marker</Button>
                    <Button onClick={play}>Play / Pause</Button>
                    <Button onClick={removeLastMarker}>Remove last marker</Button>
                    <Button onClick={shuffleLastMarker}>Shuffle last marker</Button>
                    <Button onClick={toggleTimeline}>Toggle timeline</Button>
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

export default AudioArea;
