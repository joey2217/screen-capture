

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