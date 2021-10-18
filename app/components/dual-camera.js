import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';


export default class DualCameraComponent extends Component {
  @tracked videoStream = "";
  @tracked useFrontCamera = true;

  @tracked videoOpts = {
    video: {
      width: {
        min: 1280,
        ideal: 1920,
        max: 2560
      },
      height: {
        min: 720,
        ideal: 1080,
        max: 1440
      }
    }
  };

  async initializeCamera() {
    this.stopVideoStream();
    const cameraType = this.useFrontCamera ? "user" : "environment";
    this.videoOpts.video.facingMode =  cameraType;

    const vStream = await navigator.mediaDevices.getUserMedia(this.videoOpts);
    this.videoStream = vStream;
    this.video.srcObject = vStream;
  }

  stopVideoStream() {
    const videoStream = this.videoStream;
    if (videoStream) {
      videoStream.getTracks().forEach(track => {
        track.stop();
      });
    }
  }

  @action
  onRender(videoPlayer) {
    videoPlayer.play();
    this.video = videoPlayer;
    this.initializeCamera();
  }

  @action
  changeCamera() {
    this.useFrontCamera = !this.useFrontCamera;
    this.initializeCamera();
  }
  

}
