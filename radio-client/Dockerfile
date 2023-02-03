FROM ubuntu:focal

RUN apt-get -y update && \
	apt-get install -y \
		npm && \
		nodejs && \
	apt-get clean
	
EXPOSE 8000

ADD web-app /web-app

CMD cd web-app && node app.js
