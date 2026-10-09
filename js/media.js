const cameraVideo =
    document.getElementById("cameraVideo");

const cameraPlaceholder =
    document.getElementById("cameraPlaceholder");

const cameraStatus =
    document.getElementById("cameraStatus");

const cameraSelect =
    document.getElementById("cameraSelect");

const cameraStartB =
    document.getElementById("cameraStartB");

const cameraStopB =
    document.getElementById("cameraStopB");


let cameraStream = null;
async function loadCameras() {
    try {
        const permissionStream =
            await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            });

        permissionStream
            .getTracks()
            .forEach(function (track) {
                track.stop();
            });

        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(function (device) {
            return device.kind === "videoinput";
            });
        cameraSelect.innerHTML = "";

        if (cameras.length === 0) {
            const option =
                document.createElement("option");
            option.textContent =
                "No cameras detected";
            option.value = "";
            cameraSelect.appendChild(
                option
            );

            cameraStatus.textContent =
                "No camera was detected.";
            return;

        }
        cameras.forEach(
            function (camera, index) {
                const option =
                    document.createElement("option");
                option.value =
                    camera.deviceId;
                option.textContent =
                    camera.label ||
                    `Camera ${index + 1}`;
                cameraSelect.appendChild(
                    option
                );
            }
        );
        cameraStatus.textContent =
            `${cameras.length} camera(s) detected.`;

    }
    catch (error) {
        console.error(
            "Camera detection error:",
            error
        );
        cameraStatus.textContent =
            "Camera permission is required to detect available cameras.";
    }
}

async function startCamera() {
    try {
        stopCamera();
        const selectedCamera =
            cameraSelect.value;
        cameraStatus.textContent =
            "Starting camera...";
        const videoSettings =
            selectedCamera
                ? {
                    deviceId: {
                        exact: selectedCamera
                    }
                }
                : true;

        cameraStream =
            await navigator.mediaDevices.getUserMedia({
                video: videoSettings,
                audio: false
            });
        cameraVideo.srcObject =
            cameraStream;
        cameraVideo.style.display =
            "block";
        cameraPlaceholder.style.display =
            "none";
        cameraStatus.textContent =
            "Camera is active.";
    }
    catch (error) {
        console.error(
            "Camera error:",
            error
        );
        cameraStatus.textContent =
            "Unable to access the selected camera.";
    }
}

function stopCamera() {
    if (cameraStream) {
        cameraStream
            .getTracks()
            .forEach(function (track) {
                track.stop();
            });
        cameraStream = null;
    }
    if (cameraVideo) {
        cameraVideo.srcObject =
            null;
        cameraVideo.style.display =
            "none";
    }
    if (cameraPlaceholder) {
        cameraPlaceholder.style.display =
            "block";
    }
}
if (cameraStartB) {
    cameraStartB.addEventListener(
        "click",
        startCamera
    );
}
if (cameraStopB) {
    cameraStopB.addEventListener(
        "click",
        function () {
            stopCamera();
            cameraStatus.textContent =
                "Camera test ended.";
        }
    );
}
if (navigator.mediaDevices) {
    navigator.mediaDevices.addEventListener(
        "devicechange",
        loadCameras
    );
}

loadCameras();
const micSelect =
    document.getElementById("micSelect");

const micRecordB =
    document.getElementById("micRecordB");

const micStopB =
    document.getElementById("micStopB");

const micPlayB =
    document.getElementById("micPlayB");

const micPlayback =
    document.getElementById("micPlayback");

const micStatus =
    document.getElementById("micStatus");

const micWave =
    document.getElementById("micWave");

const micPlaceholder =
    document.getElementById("micPlaceholder");


let micStream = null;
let mediaRecorder = null;
let recordedChunks = [];
let recordedAudioURL = null;
let micAudioContext = null;
let micAnalyser = null;
let micSource = null;
let micAnimationFrame = null;
async function loadMicrophones() {
    try {
        const permissionStream =
            await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            });

        permissionStream
            .getTracks()
            .forEach(function (track) {
                track.stop();
            });

        const devices =
            await navigator.mediaDevices.enumerateDevices();

        const microphones =
            devices.filter(function (device) {
                return device.kind === "audioinput";
            });

        micSelect.innerHTML = "";
        if (microphones.length === 0) {
            const option =
                document.createElement("option");
            option.value = "";
            option.textContent =
                "No microphones detected";
            micSelect.appendChild(
                option
            );

            micStatus.textContent =
                "No microphone was detected.";
            return;
        }
        microphones.forEach(
            function (microphone, index) {
                const option =
                    document.createElement("option");
                option.value =
                    microphone.deviceId;
                option.textContent =
                    microphone.label ||
                    `Microphone ${index + 1}`;
                micSelect.appendChild(
                    option
                );
            }
        );

        micStatus.textContent =
            `${microphones.length} microphone(s) detected.`;
    }

    catch (error) {
        console.error(
            "Microphone detection error:",
            error
        );
        micStatus.textContent =
            "Microphone permission is required to detect available microphones.";
    }
}

function drawEmptyWave() {
    if (!micWave) {
        return;
    }
    const canvas =
        micWave;

    canvas.width =
        canvas.clientWidth *
        window.devicePixelRatio;

    canvas.height =
        canvas.clientHeight *
        window.devicePixelRatio;

    const ctx =
        canvas.getContext("2d");

    ctx.setTransform(
        window.devicePixelRatio,
        0,
        0,
        window.devicePixelRatio,
        0,
        0
    );

    const width =
        canvas.clientWidth;

    const height =
        canvas.clientHeight;

    ctx.clearRect(
        0,
        0,
        width,
        height
    );

    ctx.beginPath();
    ctx.moveTo(
        15,
        height / 2
    );

    ctx.lineTo(
        width - 15,
        height / 2
    );

    ctx.strokeStyle =
        "#8EA6D0";

    ctx.lineWidth =
        2;

    ctx.stroke();
}

function startMicWaveform(stream) {
    micAudioContext =
        new AudioContext();

    micSource =
        micAudioContext.createMediaStreamSource(
            stream
        );

    micAnalyser =
        micAudioContext.createAnalyser();


    /*
        Higher fftSize = smoother waveform.
    */

    micAnalyser.fftSize =
        2048;


    micSource.connect(
        micAnalyser
    );


    const bufferLength =
        micAnalyser.fftSize;


    const dataArray =
        new Uint8Array(
            bufferLength
        );


    const canvas =
        micWave;


    const ctx =
        canvas.getContext("2d");


    function resizeCanvas() {

        canvas.width =
            canvas.clientWidth *
            window.devicePixelRatio;


        canvas.height =
            canvas.clientHeight *
            window.devicePixelRatio;


        ctx.setTransform(
            window.devicePixelRatio,
            0,
            0,
            window.devicePixelRatio,
            0,
            0
        );

    }


    resizeCanvas();


    function drawWave() {

        micAnimationFrame =
            requestAnimationFrame(
                drawWave
            );


        micAnalyser.getByteTimeDomainData(
            dataArray
        );


        const width =
            canvas.clientWidth;


        const height =
            canvas.clientHeight;
        ctx.clearRect(
            0,
            0,
            width,
            height
        );

        ctx.beginPath();
        ctx.moveTo(
            0,
            height / 2
        );

        ctx.lineTo(
            width,
            height / 2
        );

        ctx.strokeStyle =
            "#C4CAD6";

        ctx.lineWidth =
            1;

        ctx.stroke();


        /*
            Draw actual microphone waveform.
        */

        ctx.beginPath();


        const sliceWidth =
            width / bufferLength;


        let x = 0;


        for (
            let i = 0;
            i < bufferLength;
            i++
        ) {

            /*
                Microphone samples range around
                128 when there is silence.
            */

            const value =
                dataArray[i] / 128.0;


            const y =
                value *
                height / 2;


            if (i === 0) {

                ctx.moveTo(
                    x,
                    y
                );

            } else {

                ctx.lineTo(
                    x,
                    y
                );

            }


            x += sliceWidth;

        }


        ctx.strokeStyle =
            "#142957";


        ctx.lineWidth =
            2;


        ctx.stroke();

    }


    drawWave();

}

if (micRecordB) {

    micRecordB.addEventListener(
        "click",
        async function () {

            try {
                stopMicrophone();
                recordedChunks = [];
                if (recordedAudioURL) {

                    URL.revokeObjectURL(
                        recordedAudioURL
                    );

                    recordedAudioURL =
                        null;
                }
                micPlayB.disabled =
                    true;
                micStatus.textContent =
                    "Starting microphone...";
                const selectedMicrophone =
                    micSelect.value;
                const audioSettings =
                    selectedMicrophone
                        ? {
                            deviceId: {
                                exact:
                                    selectedMicrophone
                            }
                        }
                        : true;
                micStream =
                    await navigator.mediaDevices.getUserMedia({
                        audio:
                            audioSettings,
                        video:
                            false
                    });
                micPlaceholder.style.display =
                    "none";
                startMicWaveform(
                    micStream
                );
                mediaRecorder =
                    new MediaRecorder(
                        micStream
                    );
                mediaRecorder.addEventListener(
                    "dataavailable",
                    function (event) {
                        if (
                            event.data &&
                            event.data.size > 0
                        ) {
                            recordedChunks.push(
                                event.data
                            );
                        }
                    }
                );

                mediaRecorder.addEventListener(
                    "stop",
                    function () {
                        if (
                            recordedChunks.length === 0
                        ) {
                            return;
                        }
                        const audioBlob =
                            new Blob(
                                recordedChunks,
                                {
                                    type:
                                        mediaRecorder.mimeType
                                }
                            );
                        recordedAudioURL =
                            URL.createObjectURL(
                                audioBlob
                            );
                        micPlayback.src =
                            recordedAudioURL;
                        micPlayB.disabled =
                            false;
                        micStatus.textContent =
                            "Recording complete. Click Play to check the microphone.";
                    }
                );
                mediaRecorder.start();
                micStatus.textContent =
                    "Recording... Speak into the microphone.";
            }
            catch (error) {
                console.error(
                    "Microphone error:",
                    error
                );
                micStatus.textContent =
                    "Unable to access the selected microphone.";
            }
        }
    );

}
function stopMicrophone() {
    if (
        mediaRecorder &&
        mediaRecorder.state !== "inactive"
    ) {
        mediaRecorder.stop();
    }

    if (micStream) {
        micStream
            .getTracks()
            .forEach(function (track) {
                track.stop();
            });
        micStream =
            null;
    }

    if (micAnimationFrame) {

        cancelAnimationFrame(
            micAnimationFrame
        );


        micAnimationFrame =
            null;

    }


    /*
        Disconnect audio processing.
    */

    if (micSource) {

        micSource.disconnect();

        micSource = null;

    }


    if (micAudioContext) {

        micAudioContext.close();

        micAudioContext =
            null;

    }


    micAnalyser =
        null;

    if (micWave) {

        drawEmptyWave();

    }

}
if (micStopB) {
    micStopB.addEventListener(
        "click",
        function () {
            if (
                !mediaRecorder ||
                mediaRecorder.state ===
                    "inactive"
            ) {

                micStatus.textContent =
                    "Microphone is not recording.";

                return;

            }


            stopMicrophone();

        }
    );

}

if (micPlayB) {

    micPlayB.addEventListener(
        "click",
        async function () {

            if (!micPlayback.src) {

                micStatus.textContent =
                    "Record audio first.";

                return;

            }


            try {

                micPlayback.currentTime =
                    0;


                await micPlayback.play();


                micStatus.textContent =
                    "Playing recorded microphone audio...";

            }

            catch (error) {

                console.error(
                    "Microphone playback error:",
                    error
                );


                micStatus.textContent =
                    "Unable to play the recorded audio.";

            }

        }
    );

}

if (micPlayback) {

    micPlayback.addEventListener(
        "ended",
        function () {

            micStatus.textContent =
                "Microphone playback complete.";

        }
    );

}

if (navigator.mediaDevices) {

    navigator.mediaDevices.addEventListener(
        "devicechange",
        loadMicrophones
    );

}

drawEmptyWave();

loadMicrophones();

const speakerAudio =
    document.getElementById("speakerAudio");

const speakerLeftB =
    document.getElementById("speakerLeftB");

const speakerRightB =
    document.getElementById("speakerRightB");

const speakerBothB =
    document.getElementById("speakerBothB");

const speakerStopB =
    document.getElementById("speakerStopB");

const speakerStatus =
    document.getElementById("speakerStatus");

const speakerVolume =
    document.getElementById("speakerVolume");

const speakerVolumeValue =
    document.getElementById("speakerVolumeValue");

const speakerWave =
    document.getElementById("speakerWave");

const speakerWavePlaceholder =
    document.getElementById("speakerWavePlaceholder");


let speakerAudioContext = null;
let speakerSource = null;
let speakerPanner = null;
let speakerAnalyser = null;
let speakerGain = null;
let speakerAnimationFrame = null;

function drawEmptySpeakerWave() {
    if (!speakerWave) {
        return;
    }
    const canvas = speakerWave;
    const ctx = canvas.getContext("2d");

    const dpr =
        window.devicePixelRatio || 1;

    canvas.width =
        canvas.clientWidth * dpr;

    canvas.height =
        canvas.clientHeight * dpr;

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

    const width =
        canvas.clientWidth;

    const height =
        canvas.clientHeight;

    ctx.clearRect(
        0,
        0,
        width,
        height
    );

    ctx.beginPath();

    ctx.moveTo(
        15,
        height / 2
    );

    ctx.lineTo(
        width - 15,
        height / 2
    );

    ctx.strokeStyle =
        "#8EA6D0";

    ctx.lineWidth =
        2;

    ctx.stroke();
}

function initializeSpeakerAudio() {

    if (speakerAudioContext) {
        return;
    }

    const AudioContextClass =
        window.AudioContext ||
        window.webkitAudioContext;

    speakerAudioContext =
        new AudioContextClass();

    speakerSource =
        speakerAudioContext
            .createMediaElementSource(
                speakerAudio
            );

    speakerPanner =
        speakerAudioContext
            .createStereoPanner();

    speakerGain =
        speakerAudioContext
            .createGain();

    speakerAnalyser =
        speakerAudioContext
            .createAnalyser();

    speakerAnalyser.fftSize =
        2048;

    speakerSource.connect(
        speakerPanner
    );

    speakerPanner.connect(
        speakerGain
    );

    speakerGain.connect(
        speakerAnalyser
    );

    speakerAnalyser.connect(
        speakerAudioContext.destination
    );

    speakerGain.gain.value =
        Number(
            speakerVolume.value
        ) / 100;
}

function startSpeakerWaveform() {

    if (!speakerAnalyser) {
        return;
    }
    if (speakerAnimationFrame) {

        cancelAnimationFrame(
            speakerAnimationFrame
        );
    }


    const canvas =
        speakerWave;

    const ctx =
        canvas.getContext("2d");

    const dpr =
        window.devicePixelRatio || 1;

    canvas.width =
        canvas.clientWidth * dpr;

    canvas.height =
        canvas.clientHeight * dpr;

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );


    const bufferLength =
        speakerAnalyser.fftSize;

    const dataArray =
        new Uint8Array(
            bufferLength
        );


    function draw() {

        speakerAnimationFrame =
            requestAnimationFrame(
                draw
            );

        speakerAnalyser
            .getByteTimeDomainData(
                dataArray
            );


        const width =
            canvas.clientWidth;

        const height =
            canvas.clientHeight;


        ctx.clearRect(
            0,
            0,
            width,
            height
        );
        ctx.beginPath();

        ctx.moveTo(
            0,
            height / 2
        );

        ctx.lineTo(
            width,
            height / 2
        );

        ctx.strokeStyle =
            "#C4CAD6";

        ctx.lineWidth =
            1;

        ctx.stroke();
        ctx.beginPath();

        const sliceWidth =
            width / bufferLength;

        let x = 0;


        for (
            let i = 0;
            i < bufferLength;
            i++
        ) {
            const value =
                dataArray[i] / 128;
            const y =
                value * height / 2;
            if (i === 0) {
                ctx.moveTo(
                    x,
                    y
                );
            } else {

                ctx.lineTo(
                    x,
                    y
                );
            }
            x += sliceWidth;
        }
        ctx.strokeStyle =
            "#142957";
        ctx.lineWidth =
            2;
        ctx.stroke();
    }
    draw();
}

function stopSpeakerWaveform() {
    if (speakerAnimationFrame) {
        cancelAnimationFrame(
            speakerAnimationFrame
        );
        speakerAnimationFrame =
            null;
    }
    drawEmptySpeakerWave();
}

async function playSpeakerTest(
    pan,
    side
) {
    try {
        initializeSpeakerAudio();
        if (
            speakerAudioContext.state ===
            "suspended"
        ) {

            await speakerAudioContext
                .resume();
        }

        speakerPanner.pan.value =
            pan;

        speakerAudio.pause();

        speakerAudio.currentTime =
            0;

        if (speakerWavePlaceholder) {

            speakerWavePlaceholder
                .style.display =
                "none";
        }

        await speakerAudio.play();
        startSpeakerWaveform();
        if (side === "left") {
            speakerStatus.textContent =
                "Playing through the left speaker.";
        }
        else if (side === "right") {
            speakerStatus.textContent =
                "Playing through the right speaker.";
        }
        else {
            speakerStatus.textContent =
                "Playing through both speakers.";
        }
    }
    catch (error) {
        console.error(
            "Speaker test error:",
            error
        );
        speakerStatus.textContent =
            "Unable to play the speaker test audio.";
    }
}

if (speakerLeftB) {
    speakerLeftB.addEventListener(
        "click",
        function () {
            playSpeakerTest(
                -1,
                "left"
            );
        }
    );
}

if (speakerRightB) {

    speakerRightB.addEventListener(
        "click",
        function () {

            playSpeakerTest(
                1,
                "right"
            );
        }
    );
}

if (speakerBothB) {

    speakerBothB.addEventListener(
        "click",
        function () {

            playSpeakerTest(
                0,
                "both"
            );
        }
    );
}

if (speakerVolume) {

    speakerVolume.addEventListener(
        "input",
        function () {

            const volume =
                Number(
                    speakerVolume.value
                );


            speakerVolumeValue.textContent =
                `${volume}%`;


            if (speakerGain) {

                speakerGain.gain.value =
                    volume / 100;
            }
        }
    );
}

function stopSpeakerTest() {

    if (!speakerAudio) {
        return;
    }


    speakerAudio.pause();

    speakerAudio.currentTime =
        0;

    stopSpeakerWaveform();
    if (speakerWavePlaceholder) {

        speakerWavePlaceholder
            .style.display =
            "block";
    }
    speakerStatus.textContent =
        "Speaker test stopped.";
}
if (speakerStopB) {

    speakerStopB.addEventListener(
        "click",
        stopSpeakerTest
    );
}

if (speakerAudio) {
    speakerAudio.addEventListener(
        "ended",
        function () {

            stopSpeakerWaveform();


            if (speakerWavePlaceholder) {

                speakerWavePlaceholder
                    .style.display =
                    "block";
            }


            speakerStatus.textContent =
                "Speaker test complete.";
        }
    );
}
drawEmptySpeakerWave();
const speakerAudio2 =
    document.getElementById("speakerAudio2");

const speakerLeftB2 =
    document.getElementById("speakerLeftB2");

const speakerRightB2 =
    document.getElementById("speakerRightB2");

const speakerBothB2 =
    document.getElementById("speakerBothB2");

const speakerStopB2 =
    document.getElementById("speakerStopB2");

const speakerStatus2 =
    document.getElementById("speakerStatus2");

const speakerVolume2 =
    document.getElementById("speakerVolume2");

const speakerVolumeValue2 =
    document.getElementById("speakerVolumeValue2");

const speakerWave2 =
    document.getElementById("speakerWave2");

const speakerWavePlaceholder2 =
    document.getElementById(
        "speakerWavePlaceholder2"
    );

let speakerAudioContext2 = null;
let speakerSource2 = null;
let speakerPanner2 = null;
let speakerAnalyser2 = null;
let speakerGain2 = null;
let speakerAnimationFrame2 = null;

function drawEmptySpeakerWave2() {
    if (!speakerWave2) {
        return;
    }

    const canvas =
        speakerWave2;

    const ctx =
        canvas.getContext("2d");

    const dpr =
        window.devicePixelRatio || 1;


    canvas.width =
        canvas.clientWidth * dpr;

    canvas.height =
        canvas.clientHeight * dpr;


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

    const width =
        canvas.clientWidth;

    const height =
        canvas.clientHeight;

    ctx.clearRect(
        0,
        0,
        width,
        height
    );

    ctx.beginPath();
    ctx.moveTo(
        15,
        height / 2
    );

    ctx.lineTo(
        width - 15,
        height / 2
    );

    ctx.strokeStyle =
        "#8EA6D0";

    ctx.lineWidth =
        2;

    ctx.stroke();
}

function initializeSpeakerAudio2() {

    if (speakerAudioContext2) {
        return;
    }

    const AudioContextClass =
        window.AudioContext ||
        window.webkitAudioContext;

    speakerAudioContext2 =
        new AudioContextClass();

    speakerSource2 =
        speakerAudioContext2
            .createMediaElementSource(
                speakerAudio2
            );

    speakerPanner2 =
        speakerAudioContext2
            .createStereoPanner();

    speakerGain2 =
        speakerAudioContext2
            .createGain();

    speakerAnalyser2 =
        speakerAudioContext2
            .createAnalyser();

    speakerAnalyser2.fftSize =
        2048;

    speakerSource2.connect(
        speakerPanner2
    );

    speakerPanner2.connect(
        speakerGain2
    );

    speakerGain2.connect(
        speakerAnalyser2
    );

    speakerAnalyser2.connect(
        speakerAudioContext2.destination
    );

    speakerGain2.gain.value =
        Number(
            speakerVolume2.value
        ) / 100;
}

function startSpeakerWaveform2() {
    if (!speakerAnalyser2) {
        return;
    }

    if (speakerAnimationFrame2) {
        cancelAnimationFrame(
            speakerAnimationFrame2
        );
    }

    const canvas =
        speakerWave2;

    const ctx =
        canvas.getContext("2d");

    const dpr =
        window.devicePixelRatio || 1;

    canvas.width =
        canvas.clientWidth * dpr;

    canvas.height =
        canvas.clientHeight * dpr;

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

    const bufferLength =
        speakerAnalyser2.fftSize;

    const dataArray =
        new Uint8Array(
            bufferLength
        );

    function draw() {
        speakerAnimationFrame2 =
            requestAnimationFrame(
                draw
            );

        speakerAnalyser2
            .getByteTimeDomainData(
                dataArray
            );

        const width =
            canvas.clientWidth;

        const height =
            canvas.clientHeight;

        ctx.clearRect(
            0,
            0,
            width,
            height
        );

        ctx.beginPath();
        ctx.moveTo(
            0,
            height / 2
        );
        ctx.lineTo(
            width,
            height / 2
        );
        ctx.strokeStyle =
            "#C4CAD6";

        ctx.lineWidth =
            1;
        ctx.stroke();
        ctx.beginPath();
        const sliceWidth =
            width / bufferLength;

        let x = 0;

        for (
            let i = 0;
            i < bufferLength;
            i++
        ) {
            const value =
                dataArray[i] / 128;
            const y =
                value * height / 2;

            if (i === 0) {
                ctx.moveTo(
                    x,
                    y
                );
            } else {
                ctx.lineTo(
                    x,
                    y
                );
            }
            x += sliceWidth;
        }

        ctx.strokeStyle =
            "#142957";
        ctx.lineWidth =
            2;
        ctx.stroke();
    }
    draw();
}

function stopSpeakerWaveform2() {
    if (speakerAnimationFrame2) {
        cancelAnimationFrame(
            speakerAnimationFrame2
        );

        speakerAnimationFrame2 =
            null;
    }
    drawEmptySpeakerWave2();
}

async function playSpeakerTest2(
    pan,
    side
) {
    try {
        initializeSpeakerAudio2();
        if (
            speakerAudioContext2.state ===
            "suspended"
        ) {

            await speakerAudioContext2
                .resume();
        }
        speakerPanner2.pan.value =
            pan;
        speakerAudio2.pause();
        speakerAudio2.currentTime =
            0;

        if (speakerWavePlaceholder2) {
            speakerWavePlaceholder2
                .style.display =
                "none";
        }
        await speakerAudio2.play();
        startSpeakerWaveform2();

        if (side === "left") {
            speakerStatus2.textContent =
                "Playing through the left speaker.";
        }

        else if (side === "right") {
            speakerStatus2.textContent =
                "Playing through the right speaker.";
        }

        else {
            speakerStatus2.textContent =
                "Playing through both speakers.";
        }
    }
    catch (error) {
        console.error(
            "Speaker test 2 error:",
            error
        );
        speakerStatus2.textContent =
            "Unable to play the speaker test audio.";
    }
}

if (speakerLeftB2) {
    speakerLeftB2.addEventListener(
        "click",
        function () {
            playSpeakerTest2(
                -1,
                "left"
            );
        }
    );
}

if (speakerRightB2) {
    speakerRightB2.addEventListener(
        "click",
        function () {
            playSpeakerTest2(
                1,
                "right"
            );
        }
    );
}

if (speakerBothB2) {
    speakerBothB2.addEventListener(
        "click",
        function () {
            playSpeakerTest2(
                0,
                "both"
            );
        }
    );
}

if (speakerVolume2) {
    speakerVolume2.addEventListener(
        "input",
        function () {
            const volume =
                Number(
                    speakerVolume2.value
                );
            speakerVolumeValue2
                .textContent =
                `${volume}%`;

            if (speakerGain2) {
                speakerGain2.gain.value =
                    volume / 100;
            }
        }
    );
}

function stopSpeakerTest2() {
    if (!speakerAudio2) {
        return;
    }

    speakerAudio2.pause();
    speakerAudio2.currentTime =
        0;
    stopSpeakerWaveform2();

    if (speakerWavePlaceholder2) {
        speakerWavePlaceholder2
            .style.display =
            "block";
    }

    speakerStatus2.textContent =
        "Speaker test stopped.";
}

if (speakerStopB2) {
    speakerStopB2.addEventListener(
        "click",
        stopSpeakerTest2
    );
}

if (speakerAudio2) {
    speakerAudio2.addEventListener(
        "ended",
        function () {
            stopSpeakerWaveform2();
            if (
                speakerWavePlaceholder2
            ) {
                speakerWavePlaceholder2
                    .style.display =
                    "block";
            }
            speakerStatus2.textContent =
                "Speaker test complete.";
        }
    );
}

drawEmptySpeakerWave2();