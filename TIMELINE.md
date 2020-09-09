# Development Timeline

By Rishav Bhowmik

## 8th September 2020

### Noon

- Studied the Problem statement

- Prepared action plan for developing the API

- Prepared Prototype of `server.js` and `manifest.json`

- Initialized the project with npm, installed the required npm Packages to the Project Directory

- Tested API server's end points on my local computer

### After Noon

- Deployed MongoDB cluster on MongoDB cloud Atlas, added the database `tasks` to cluster & collection `tasks` to the database

- Tested `mongodb` package on node js server to integrate mongodb deployed on Cloud Atlas

- Integrated Mongodb driver on API server's program ('server.js'), developed MongoCollection class to perform operation on database's collections (in this case just the collection `tasks`)

- Further developed `server.js` to insert task to the data base and retrive the tasks form the data base

- Tested the insertion and retrival opearations on database

- debugged and fixed the bugs in MongoCollection class

- Developed InputFilter class to test inputs in body of the post requests

- Tested InputFilter class

- Debugged & fixed InputFilter class


### Evening

- Integrated InputFilter class the the API end points (path `/add` & `/list`)

- Tested the end points using `curl`

- Integrated the Database operation (MongoCollection class) to the API end points

- Debugged & imporved MongoCollection class & the `manifest.json` file's prototype to enhance the flexibility for future updates and make code more redable

- Built new Project on Heroku Cloud

- Prepared deployment strategy

- added .git to the project folder

- deployed the project to Heroku Cloud using Heroku's CLI and GIT

- tested the endpoints to the hosted API server using `curl` from local computer

### Post Evening

- Source Added the to git repos

- Documented the development workflow

- Reviewed the project & planned some updates (such as enhanced error handeling, and methods to respond to errors)

- Futher Programmed `server.js` with imporved error handeling in Endpoints & InputFilter class

- Added more functionality to InputFilter class (to validate the time formats)

- Aested the API server locally

- Re-Deployed the project on heroku cloud

- Tested the project on hosted API server remortly from LocalComputer using `curl` and browser

- Updated the source codes and descriptions to Git Repos
