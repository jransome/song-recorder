const chunks = []

module.exports = (sourceId, audioElem) => {

  let constraints = {
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: sourceId,
      }
    },
    audio: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: sourceId,
      }
    }
  }

  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      const recorder = new MediaRecorder(stream)
      recorder.ondataavailable = (e) => {
        chunks.push(e.data)
      }

      recorder.onstop = (e) => {
        const blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
        const audioURL = window.URL.createObjectURL(blob)
        audioElem.src = audioURL
      }

      recorder.start()
      console.log('started recording')

      setTimeout(() => {
        console.log('stopped recording')
        recorder.stop()
      }, 10000)
    })
}

//     console.log(sources)
//     sources.forEach((source) => {
//         if (source.name === 'Spotify') {

//             navigator.mediaDevices.getUserMedia({
//                 video: {
//                     mandatory: {
//                         chromeMediaSource: 'desktop',
//                         chromeMediaSourceId: source.id,
//                     }
//                 },
//                 audio: {
//                     mandatory: {
//                         chromeMediaSource: 'desktop',
//                         chromeMediaSourceId: source.id,
//                     }
//                 }
//             })
//                 .then((stream) => {
//                     console.log(stream.getAudioTracks())

//                     const recorder = new MediaRecorder(stream)

//                     let chunks = []
//                     recorder.ondataavailable = (e) => {
//                         console.log('datavailable')
//                         chunks.push(e.data)
//                     }

//                     recorder.onstop = (e) => {
//                         let blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
//                         let audioURL = window.URL.createObjectURL(blob);
//                         console.log('stopped', audioURL)
//                         document.querySelector('audio').src = audioURL;
//                     }

//                     recorder.start()
//                     console.log('started recording')

//                     setTimeout(() => {
//                         console.log('stopping')
//                         recorder.stop()
//                     }, 10000)



//                     // const output = document.querySelector('audio')
//                     // output.srcObject = stream
//                     // output.onloadedmetadata = (e) => output.play()

//                 })
//                 .catch((e) => handleError(e))

//         }
//     })
// })
// }




// console.log(sources)
//   for (let i = 0; i < sources.length; ++i) {
// if (sources[i].name === 'Electron') {
//   navigator.mediaDevices.getUserMedia({
//     audio: false,
//     video: {
//       mandatory: {
//         chromeMediaSource: 'desktop',
//         chromeMediaSourceId: sources[i].id,
//         minWidth: 1280,
//         maxWidth: 1280,
//         minHeight: 720,
//         maxHeight: 720
//       }
//     }
//   })
//   .then((stream) => handleStream(stream))
//   .catch((e) => handleError(e))
//   return
// }
//   }

// function handleStream(stream) {
//     const video = document.querySelector('video')
//     video.srcObject = stream
//     video.onloadedmetadata = (e) => video.play()
// }

// function handleError(e) {
//     console.log(e)
// }