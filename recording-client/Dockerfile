FROM ubuntu:focal
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get -y update && \
	apt-get install -y \
		ffmpeg && \
	apt-get clean
	
CMD sleep infinity
