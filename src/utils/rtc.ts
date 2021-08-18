const pc = new window.RTCPeerConnection()

// 1.发起连接 创建offer, 发送给控制端
export async function createOffer() {
    const offer = await pc.createOffer({
        offerToReceiveAudio: false,
        offerToReceiveVideo: true,
    })
    await pc.setLocalDescription(offer)
    console.log('createOffer\n', JSON.stringify(pc.localDescription));
    return pc.localDescription
}

// 2. 控制端,添加被控制offer
let candidates: RTCIceCandidate[] = []
export async function addIceCandidate(candidate: RTCIceCandidate ){
    if (!candidate || !candidate.type) return
    candidates.push(candidate)
    if (pc.remoteDescription && pc.remoteDescription.type) {
        for (let i = 0; i < candidates.length; i++) {
            await pc.addIceCandidate(new RTCIceCandidate(candidates[i]))
        }
        candidates = []
    }
}


pc.onicecandidate = (e) =>{
    console.log('candidate', JSON.stringify(e.candidate))
    
}