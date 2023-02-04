# Radio Playground

This is an educational project purposed to provide playground for different audio streaming solutions. Multiple docker containers play their role in the radio streaming network. 

At the current stage, the playground allows comparing the WebRTC and adaptive HTTP streaming.

The following containers have been created:

* **Radio Client** - receives audio streams. Built as a simple NodeJS application.
* **Recording Client** - records audio streams with the ffmpeg tool.
* **Janus Server** - serves audio stream in a WebRTC fashion. Built from [janus-gateway](https://github.com/meetecho/janus-gateway) source code.
* **HLS Server** - serves audio stream as a HLS stream. Uses the rtmp-hls streaming server [image](https://hub.docker.com/r/alqutami/rtmp-hls).

![diagram](diagram.png)

## Start
### Debian Distros


