## What do I need to run this project?
  - Docker or Docker Engine
  - Node Version Manager (NVM)

## Setup
  1) `nvm use` (`nvm install v12.13.0 `if you don't have it)
  2) Make sure you have Docker installed and running (https://docs.docker.com/docker-for-mac/install/)
  3) `cd server && npm install && cd ..`
  4) `cd client && npm install && cd ..`
  5) Run `docker-compose up --build` and you should be ready to go


## When a new dependency is installed,
  1) `npm install axios` on client or server
  2) `docker-compose up --build` on the project root. (Docker will automatically run `npm install` and update the image)
  
## How do I view the DB?
  1) Download Robo 3T
  2) Spin up your containers (`docker-compose up --build`)
  3) Create a connection on localhost:27017 with the creds on docker-compose.yml