# Board Infinity Hackathlon solution
Made By : Rishav Bhowmik | KIIT RollNO: 1706349

## Live Demo
`https://boardinfinityhackrishav.herokuapp.com/` <-- Copy this
[Link for Live Demo on Heroku, API Server](https://boardinfinityhackrishav.herokuapp.com/) <-hyperlinked

End point Links:

[Link for Live Demo on Heroku, for Backend path](https://boardinfinityhackrishav.herokuapp.com/)

[Link for Live Demo on Heroku, for Backend path](https://boardinfinityhackrishav.herokuapp.com/)

### End points :
  - **`/add` - POST endpoint which adds the data**
    
    URL FOR THE END POINT : `https://boardinfinityhackrishav.herokuapp.com/add`
    
    This end point requires a **post** request with **JSON** body  on path `/add`
    
    Example :
    Test this End points using ***curl*** : `curl -i -X POST -H "Content-Type: application/json" -d "{\"name\":\"<task name>\", \"description\":\"<task description>\", \"creator\":\"<creator>\", \"duration\":\"1h\"}" https://boardinfinityhackrishav.herokuapp.com/add`
    
    **JSON BODY for the end point's POST Request:**
    
    - `name` : Task name as <string>
  
    - `description` : Task Description as <string>
  
    - `creator` : Name of Task Creator as <string>
    
    - `duration` : <string> in [zeit/ms format](https://github.com/vercel/ms)  
    
      examples : `'2 days'` `10h` `2.5 hrs` `5s` `100`
      
      
  - **`/list` - GET endpoint which lists all the data**
  
    URL FOR THE END POINT : [`https://boardinfinityhackrishav.herokuapp.com/list`](`https://boardinfinityhackrishav.herokuapp.com/list`)
    
    This end point requires a **get** request on path `/list`
    
    This end point returns JSON text holding a Array of Objects, these object are the documents retirived from the data base
    
  

## Componets of this project

  - **MongoDB DataBase (with Scheduled Trigger)**
  
    - cluster `cluster0` <-- database `tasks` <-- collection `tasks`
    
    - Trigger connected to custer0
      
      - Scheduled to execute in interval of every one minute
      
      - Source code for the trigger function
        ```
        exports = async function() {
            const collection = context.services.get('Cluster0').db("tasks").collection("tasks");
            var result = await collection.deleteMany({"expiresAt":{"$lt":new Date()}});
            return result; //can return null too instead
        };
        ```
  

  - **API Server**
    - `manifest.json` : This json file store important data for the server to start & operate. [Prototype for `manifest.json`](https://github.com/b19kiit/boardinfinity_backend_rishav/blob/master/manifest.json)

    - `package.json` : This json file is for npm packages

    - `server.js` : This is the main JavaScript file for the API server

    - `node_modules` :  This folder contail all the npm packges required in this project
  
## To start the API server
This project is developed on NodeJS version `12.18.3'

