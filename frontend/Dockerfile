FROM node:14.15.4
WORKDIR /frontend
COPY ./boot-dev.sh boot-dev.sh
RUN chmod +x boot-dev.sh
ENTRYPOINT [ "bash" ]
CMD ["./boot-dev.sh"]