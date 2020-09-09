# Board Infinity Hackathlon solution
Made By : Rishav Bhowmik | KIIT RollNO: 1706349

[**Development Time Line (TIMELINE.md)**](https://github.com/b19kiit/boardinfinity_backend_rishav/blob/master/TIMELINE.md)

## Live Demo
[`https://boardinfinityhackrishav.herokuapp.com/`](https://boardinfinityhackrishav.herokuapp.com/) <-- Copy this (This link just the root, it will not return anything, So check then end points)

End point Links:

[Link, path = '/add' to add new 'task'](https://boardinfinityhackrishav.herokuapp.com/add) <-- Copy this  (! This link will only respond to POST request )

[Link, path = '/list' to return all 'tasks' on database](https://boardinfinityhackrishav.herokuapp.com/list) <-- Copy this

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
    
  

## Components of this project

  - **MongoDB DataBase (with Scheduled Trigger)**
  
    - cluster `cluster0` <-- database `tasks` <-- collection `tasks`
    
    - Trigger connected to custer0
      
      - Scheduled to execute in interval of every one minute
      
      - Source code for the trigger function
        ```js script
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
    
    
  
## To start the API server locally
This project is developed on NodeJS version `12.18.3'

Clone this project from `https://github.com/b19kiit/boardinfinity_backend_rishav.git`

Install npm packages `npm install`

Prepare `manifest.json` file as per the configuration of your system and URI for connecting to mongodb database

Start the API Server `npm start`


## Testing the End Points
  
  - **Endpoint `/add`** :
  
    **USING curl**
  
    `curl -i -X POST -H "Content-Type: application/json" -d "{\"name\":\"Breakfast\", \"description\":\"I will have Aloo ka Paratha in Morning\", \"creator\":\"Someone\", \"duration\":\"10h\"}" https://boardinfinityhackrishav.herokuapp.com/add`
    
    `curl -i -X POST -H "Content-Type: application/json" -d "{\"name\":\"Lunch\", \"description\":\"I will have Rajma Chawal in Noon\", \"creator\":\"Someone\", \"duration\":\"16h\"}" https://boardinfinityhackrishav.herokuapp.com/add`
    
    `curl -i -X POST -H "Content-Type: application/json" -d "{\"name\":\"Dinner\", \"description\":\"I will figure something out for the dinner\", \"creator\":\"Someone\", \"duration\":\"1day\"}" https://boardinfinityhackrishav.herokuapp.com/add`


  - **Endpoint `/list`**
  
     `curl https://boardinfinityhackrishav.herokuapp.com/list`
     
     Or use URL [https://boardinfinityhackrishav.herokuapp.com/list](https://boardinfinityhackrishav.herokuapp.com/list) on your browser, Firfox Browser has an excellent UI to display JSON files


  ### Lets Check if our trigger can delete the expired tasks
   
   Adding a task with duration of 30 seconds
   
   
   `curl -i -X POST -H "Content-Type: application/json" -d "{\"name\":\"Dinner\", \"description\":\"I will figure something out for the dinner\", \"creator\":\"Someone\", \"duration\":\"30s\"}" https://boardinfinityhackrishav.herokuapp.com/add`
    
  Check the list before 30 seconds
    
 `curl https://boardinfinityhackrishav.herokuapp.com/list` OR [Open in Browser](https://boardinfinityhackrishav.herokuapp.com/list)
 
   
  Wait for 1 minute, And again check the list

  `curl https://boardinfinityhackrishav.herokuapp.com/list` OR [Open in Browser](https://boardinfinityhackrishav.herokuapp.com/list)


  **Why have we waited for 1 min and not 30 s?**
  ```
  The trigger on MongoDB Cloud Atlas is fired in interval of every 1min, so in worst possible scenario The task should be removed after 1 min
  ```

### Trace Error response on endpoints

When ever a request with invalid parameters is sent to the API server, it will respond with 400 Bad Request and a body as JSON text of type `{err:"<Error Message>"}`

**Note** The server may also respond similarly incase of error on database or some unknown error
