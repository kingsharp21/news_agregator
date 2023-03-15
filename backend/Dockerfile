version:'3.7'

services:

    backend:
        build:
            context: ./server
            dockerfile: Dockerfile
        networks:
            - app

    frontend:
        build:
            context: ./server
            dockerfile: Dockerfile

        networks:
            - app

    db:
        image: mysql:5.7.22
        enviroment:
            MYSQL_DATABASE: 'auth'
            MYSQL_USER: 'root'
            MYSQL_PASSWORD: ''
        networks:
            - app


networks:

    app:

        driver: bridge
    