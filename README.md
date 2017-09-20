S1 Validation Service
======================================

It uses json-schema draft 6 to validate inputs (JSON) and return all errors in a single call.

How to build it in Docker

docker build -t "validation_srv" .
docker run -p 6001:6001 -d validation_srv
