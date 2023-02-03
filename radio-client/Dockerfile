FROM ubuntu:focal
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get -y update && \
	apt-get install -y \
		npm && \
		nodejs && \
	apt-get clean
	
EXPOSE 8083

ADD web-app /web-app

CMD cd web-app && node app.js
