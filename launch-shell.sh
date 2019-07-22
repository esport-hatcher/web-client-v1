#! /bin/sh

docker exec -it $(docker ps --filter "name=stack_client" -q | xargs) sh