```mermaid
sequenceDiagram
    participant user
    participant browser
    participant server

    user ->> browser: the user write a new note and clicked the Save button. 
    browser ->> server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
   
    activate server
    server -->> browser:   response with http code 302 
    note left of server: the server add the new note
    deactivate server

    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    note right of browser: The browser follows the redirection automatically

    activate server
    server -->> browser:   HTML
    deactivate server

    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    
    activate server
    server -->> browser:   the css file
    deactivate server
    
    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    
    activate server
    server -->> browser:   the javascript file
    note right of browser: The browser executes main.js and requests data from the server
    deactivate server

    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/data.json

    activate server
    server -->> browser:   [{content: 'prueba', date: '2025-02-09T15:19:35.479Z'}]
    note right of browser: the browser executes the callback functions and render the notes
    deactivate server

    browser ->> user: the user can see the note that he added
 ```