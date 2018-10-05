# spring-boot-angular-sse
Sample project Spring Boot + Server Sent Events + Angular

## Preparations

- install npm (Node Package Manager)
- install angular-cli via npm
- run "npm install" to download client dependencies (node_modules folder should appear)

## Build

- Build front-end (client): ng build
- Build back-end (server): mvn clean install

## Run

java -jar \<path to jar\>

## Run frontend and backend separately (UI dev mode)

- Run application as usual
- Execute "ng serve --proxy-config proxy.conf.json" in terminal
- Go to localhost:4200

Client deployed separately, but will use usual backend.
When some changes done in IDE, angular will automatically rebuild client side and deploy it.

