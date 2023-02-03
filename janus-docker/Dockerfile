FROM ubuntu:focal AS build
ENV DEBIAN_FRONTEND=noninteractive

RUN mkdir /build

RUN apt-get -y update && \
	apt-get install -y \
		libavutil-dev \
		libavformat-dev \
		libavcodec-dev \
		libmicrohttpd-dev \
		libjansson-dev \
		libssl-dev \
		libsofia-sip-ua-dev \
		libglib2.0-dev \
		libopus-dev \
		libogg-dev \
		libcurl4-openssl-dev \
		liblua5.3-dev \
		libconfig-dev \
		libusrsctp-dev \
		libwebsockets-dev \
		libnanomsg-dev \
		librabbitmq-dev \
		pkg-config \
		gengetopt \
		libtool \
		automake \
		build-essential \
		wget \
		git && \
	apt-get clean && \
	rm -rf /var/lib/apt/lists/*


RUN cd /build && \
	wget https://github.com/cisco/libsrtp/archive/v2.3.0.tar.gz && \
	tar xfv v2.3.0.tar.gz && \
	cd libsrtp-2.3.0 && \
	./configure --prefix=/usr --enable-openssl && \
	make shared_library && \
	make install

# Install build dependencies of libnice
RUN \
  apt-get update && \
  apt-get install -y \
	  libssl-dev \
    libglib2.0-dev \
    python3 \
    python3-pip \
    python3-setuptools \
    python3-wheel \
    ninja-build \
    gtk-doc-tools && \
  pip3 install meson

RUN \
  cd /build && \
  git clone --branch 0.1.18 https://gitlab.freedesktop.org/libnice/libnice.git && \
  cd libnice && \
  meson builddir && \
  ninja -C builddir && \
  ninja -C builddir install

RUN \
  cd /build && \
  git clone --branch v0.11.8 https://github.com/meetecho/janus-gateway.git
RUN cd /build/janus-gateway && \
	sh ./autogen.sh && \
	./configure --enable-post-processing --prefix=/usr/local && \
	make && \
	make install && \
	make configs
	
# Install dependencies of dockerize
RUN \
  apt-get update && \
  apt-get install -y \
    wget

# Install dockerize
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

FROM ubuntu:focal 
ARG app_uid=999
ARG ulimit_nofile_soft=524288
ARG ulimit_nofile_hard=1048576
ARG BUILD_DATE="undefined"
ARG GIT_BRANCH="undefined"
ARG GIT_COMMIT="undefined"
ARG VERSION="undefined"

LABEL build_date=${BUILD_DATE}
LABEL git_branch=${GIT_BRANCH}
LABEL git_commit=${GIT_COMMIT}
LABEL version=${VERSION}

RUN apt-get -y update && \
	apt-get install -y \
		libmicrohttpd12 \
		libavutil-dev \
		libavformat-dev \
		libavcodec-dev \
		libjansson4 \
		libssl1.1 \
		libsofia-sip-ua0 \
		libglib2.0-0 \
		libopus0 \
		libogg0 \
		libcurl4 \
		liblua5.3-0 \
		libconfig9 \
		libusrsctp1 \
		libwebsockets15 \
		libnanomsg5 \
		librabbitmq4 && \
	apt-get clean && \
	rm -rf /var/lib/apt/lists/*

COPY --from=0 /usr/lib/libsrtp2.so.1 /usr/lib/libsrtp2.so.1
RUN ln -s /usr/lib/libsrtp2.so.1 /usr/lib/libsrtp2.so


COPY --from=build /usr/local /usr/local

ENV BUILD_DATE=${BUILD_DATE}
ENV GIT_BRANCH=${GIT_BRANCH}
ENV GIT_COMMIT=${GIT_COMMIT}
ENV VERSION=${VERSION}

# Set ulimits
RUN \
  echo ":${app_uid}	soft	nofile	${ulimit_nofile_soft}" > /etc/security/limits.conf && \
  echo ":${app_uid}	hard	nofile	${ulimit_nofile_hard}" >> /etc/security/limits.conf

# Do not run as root unless necessary
RUN groupadd -g ${app_uid} app && useradd -r -u ${app_uid} -g app app

# Copy entrypoint and config templates
#COPY entrypoint.sh /entrypoint.sh
#RUN chmod +x /entrypoint.sh
ADD templates /templates

# Start the gateway
ENV LD_LIBRARY_PATH=/usr/local/lib:/usr/local/lib/x86_64-linux-gnu
CMD dockerize -template /templates:/usr/local/etc/janus su app -c /usr/local/bin/janus 
