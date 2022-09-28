FROM python:3.7

WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY ./boot-dev.sh boot-dev.sh
RUN chmod +x boot-dev.sh
ENTRYPOINT [ "bash" ]
CMD ["./boot-dev.sh"]