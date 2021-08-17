

const displayMediaOptions = {
    video: {
        cursor: "always"
    },
    audio: false
};

export function getCaptureStream(): Promise<MediaStream> {
    // @ts-ignore
    return navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
}

let recorder: any;
let recordedChunks: any[] = []
let numRecordedChunks = 0

export function startRecordCapture(stream: MediaStream, onRecorderStop: () => void) {
    recordedChunks = []
    // @ts-ignore
    recorder = new MediaRecorder(stream)
    recorder.ondataavailable = recorderOnDataAvailable
    recorder.onstop = () => {
        onRecorderStop()
        download()
        console.log('recorderOnStop fired');
    }
    recorder.start()
}

function recorderOnDataAvailable(event: any) {
    if (event.data && event.data.size > 0) {
        recordedChunks.push(event.data)
        numRecordedChunks += event.data.byteLength
    }
}

export function stopRecord() {
    recorder.stop()
    recorder = null
    // TODO
}

const download = () => {
    let blob = new Blob(recordedChunks, { type: 'video/mp4' })
    let url = URL.createObjectURL(blob)
    let a = document.createElement('a')
    document.body.appendChild(a)
    // @ts-ignore
    a.style = 'display: none'
    a.href = url
    a.download = `screen-recorder-${new Date().toLocaleString('zh-CN', { hour12: false })}.mp4`
    a.click()
    setTimeout(function () {
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
    }, 100)
}