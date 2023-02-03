FROM ubuntu:focal

RUN apt-get -y update && \
	apt-get install -y \
		ffmpeg && \
	apt-get clean
	
ADD audio /audio 
CMD sleep infinity
