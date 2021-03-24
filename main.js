import 'regenerator-runtime/runtime'

const videoElement = document.createElement('video');
const domElement = document.querySelector('.zcx');
const btn = document.querySelector('.btn');

async function getVideo() {
    const video = await navigator.mediaDevices.getDisplayMedia();
    videoElement.hidden = true;
    videoElement.srcObject = video;

    videoElement.onloadedmetadata = async () =>  {
        domElement.appendChild(videoElement);
        videoElement.play();

        await videoElement.requestPictureInPicture();
    }
}

getVideo()

