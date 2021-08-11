import { Button, Space } from "antd"
import { useEffect, useRef } from "react"
import { getCaptureStream } from '../utils/screenCapture'

export default function Home() {
  const videoEl = useRef<HTMLVideoElement | null>(null)

  useEffect(()=>{
    if (videoEl.current) {
      videoEl.current.onplay = ()=>{
        console.log('onplay');
      }
      videoEl.current.onpause = ()=>{
        console.log('onpause');
      }
    }
  },[])

  const onStartCapture = async () => {
    const stream = await getCaptureStream()
    if (videoEl.current) {
      videoEl.current.srcObject = stream
      videoEl.current.onloadedmetadata = () => {
        videoEl.current!.play()
        // @ts-ignore
        videoEl.current!.requestPictureInPicture().catch(err=>{
          console.error(err);
        })
      }
    }
  }

  const onStopCapture = () => {
    const tracks = (videoEl.current!.srcObject as MediaStream).getTracks()
    tracks.forEach(track => track.stop())
    videoEl.current!.srcObject = null
  }

  return (
    <div>
      <div className="text-center">
        <video ref={videoEl} className="max-w-4xl w-full border border-solid border-gray-500"></video>
      </div>
      <Space>
        <Button type="primary" onClick={onStartCapture}>Start</Button>
        <Button type="primary" onClick={onStopCapture}>End</Button>
      </Space>
    </div>
  )
}
