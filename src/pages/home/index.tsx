import { useRef, useState } from "react"
import { Button, message } from "antd"
import { getCaptureStream, startRecordCapture, stopRecord } from '../../utils/screenCapture'

export default function Home() {
    const videoEl = useRef<HTMLVideoElement | null>(null)
    const [playing, setPlaying] = useState(false)

    const onStartCapture = async () => {
        try {
            const stream = await getCaptureStream()
            if (videoEl.current) {
                videoEl.current.srcObject = stream
                videoEl.current.onloadedmetadata = () => {
                    videoEl.current!.play()
                    setPlaying(true)
                    startRecordCapture(stream, onStopCapture)
                    // @ts-ignore
                    videoEl.current!.requestPictureInPicture().catch(err => {
                        console.error(err);
                    })
                }
            }
        } catch (error) {
            message.error(error.message)
            console.table(error);
        }
    }

    const onStopCapture = (bool?: boolean) => {
        try {
            if (bool) {
                stopRecord()
            }
            setPlaying(false)
            // @ts-ignore
            document.exitPictureInPicture()
            // @ts-ignore
            const tracks = (videoEl.current!.srcObject as MediaStream).getTracks()
            tracks.forEach(track => track.stop())
            videoEl.current!.srcObject = null
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="text-center">
            <div>
                <video ref={videoEl} className="max-w-4xl w-full border border-solid border-gray-500"></video>
            </div>
            <div>
                {
                    playing ? <Button type="primary" onClick={() => onStopCapture(true)}>Stop</Button> :
                        <Button type="primary" onClick={onStartCapture}>Start</Button>
                }
            </div>
        </div>
    )
}
