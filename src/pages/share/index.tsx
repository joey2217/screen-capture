import React, { memo, useEffect } from 'react'
import { Button, Alert, Input, message, Modal } from 'antd'
import { createOffer } from '../../utils/rtc'
import { useState } from 'react'

// TODO 信令服务器
const Share: React.FC = () => {
    const [offer, setOffer] = useState('')
    const [candidate, setCandidate] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false)
    useEffect(() => {
        createOffer().then((offer) => {
            setOffer(JSON.stringify(offer))
        })
    }, [])


    const copy = async () => {
        try {
            await navigator.clipboard.writeText(offer)
            message.success('复制成功!')
        } catch (error) {
            message.error('复制失败,请手动复制!')
        }
    }
    const onOK = () => {
        setIsModalVisible(false)
    }
    return (
        <>
            <div className="relative h-full flex flex-col justify-center pt-8">
                <div className="text-center">
                    <Button onClick={() => setIsModalVisible(true)}>Start</Button>
                    <Button>Stop</Button>
                    <Button onClick={copy}>Copy</Button>
                    <Alert type="info" message="由于没有信令服务器,请手动复制信令"></Alert>
                    <Input.TextArea value={offer}></Input.TextArea>
                </div>
                <video></video>
            </div>
            <Modal title="请输入要控制的信令" visible={isModalVisible} onOk={onOK} onCancel={() => setIsModalVisible(false)}>
                <Input.TextArea value={candidate} onChange={e => setCandidate(e.target.value)}></Input.TextArea>
            </Modal>
        </>
    )
}

export default memo(Share)
