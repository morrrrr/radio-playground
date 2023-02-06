# Radio Playground

Radio Playground is an educational project purposed to provide playground for different audio streaming solutions. It is meant as a learning and testing tool.

Project is built as a docker network where multiple containers play their role in the radio streaming network. At the current stage, HLS and WebRTC playgrounds are provided.

## Projects Leveraged

* [HLS](https://developer.apple.com/streaming/)
* [HLS.js](https://github.com/video-dev/hls.js)
* [Janus server](https://janus.conf.meetecho.com/)
* [Janus.js](https://cdn.jsdelivr.net/npm/janus-gateway@0.2.3/)
* [FFmpeg](https://ffmpeg.org/ffmpeg-all.html)
* [RTMP-HLS Server](https://github.com/TareqAlqutami/rtmp-hls-server])

## Project Structure

![diagram](diagram.png)

**Source** - a static audio file fetched from the internet.

**Player** - receives audio streams. Built as a simple NodeJS application. Currently, provides two radio players:

* http://localhost:8083/radio/hls - a HLS.js library player that pulls down the HLS manifest, decides which bitrates to play, then requests the fragments and shoves them into the HTML audio player.
* http://localhost:8083/radio/webrtc - a Janus.js library player that attaches to the Janus Streaming Plugin and mounts to the RTP stream coming into the Janus server's 5002 port. 

**Encoder** - a simple Ubuntu device. The encoder runs FFMPEG which fetches the source audio and transforms it into streams ingested by the streaming servers. Currently, creates an RTMP stream for the HLS server, and a RTP stream for Janus server. 

**Janus Server** - serves audio stream in a WebRTC fashion. Leverages the [janus-gateway](https://github.com/meetecho/janus-gateway). Currently, configured to ingest RTP streams through the 5002 port. 

**HLS Server** - serves audio stream as a HLS stream. Leverages the [rtmp-hls streaming server](https://hub.docker.com/r/alqutami/rtmp-hls). Ingests RTMP streams through the 1935 port, fragments them into different bitrate segments, creates and serves manifests to clients.

## Theory
### RTMP-HLS Streaming
The first playground explores the RTMP-HLS streaming. 

HLS (HTTP Live Streaming) is an Apple-developed protocol for live streaming over the internet. HLS delivers content via standard HTTP web servers. Streams are captured into segments which are adaptively delivered over HTTP protocol. The client device and server dynamically detect the internet speed of the user and adjust the stream quality accordingly. This approach results in a trade off where the streaming is more reliable however of higher latency. 

RMTP ingest means using the RTMP technology to encode and then deliver the live stream from the encoder to the online streaming platform. RTMP ingest requires the use of an RTMP encoder, which is readily available and can be relatively inexpensive compared to encoders using other streaming protocols. Combined with HLS, it yields the lowest possible latency.

### WebRTC Streaming
The second playground explores the WebRTC-based streaming.

Web Real-Time Communication (WebRTC) is a streaming project that provides real-time or ultra-low latency. The basis of WebRTC is a series of JavaScript APIs that allow us to establish a peer to peer connection between two browsers to exchange data such as audio and video, allowing us to create applications with audio and video calling features.

In order to relieve the full peer-to-peer meshes which are heavy on the client side, a WebRTC gateway can be used. In this project, a Janus server is leveraged which ingests RTP radio streams and relays them to peer browsers. 

## Start
### Debian Distros

The project was built on and for debian distributions. You will need docker and docker-compose to start the project.

To start the project, first clone the repository:

    git clone https://github.com/morrrrr/radio-playground.git

Run the start script:

    cd radio-playground/scripts && ./start.sh

The script runs docker containers and starts the recording of the audio stream.

Players can be accessed via browser:

HLS player
    http://localhost:8083/radio/hls

WebRTC player
    http://localhost:8083/radio/webrtc

## Future Plans

* HLS end-to-end streaming playground
* Emulate docker network instabilities and test the streaming performance 


