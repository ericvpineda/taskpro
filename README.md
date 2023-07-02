Todo:
- finish create task page -d
- create model for tasks to save into db -d
- create ui for task list for home page -d
- create route to get all task from db to show on home page -d 
- create edit page + route -d 
- create delete route -d
- create my profile ui + route -d
- implement search functionality 
- implement muliti user functionality 
- add buttons on home page to delete task (if given user) 
- implement ability to click on tasklist header names and order
- implement going back to correct page, sign out takes you back to home page

Todo later: 
- Change color scheme to default grayed out, if selected, change to black
- Implement min view ui for nav bar 
- show error message to use if unable to create new task? (create-task page.jsx)

Note:
- inpsiration: https://www.youtube.com/watch?v=wm5gMKuwSYk

Issues
- how to set maxAge for session tokens
- label select focus tag not working next.js (Form component)
- profile page does not resize

Solutions:
- task does not add author key to db 
    - issue: user instance does not show up on mongodb atlas
    - solution: nextauth route.js -- make sure to wrap callbacks in callbacks object
- SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
    - solution: 
        - passed in incorrect url to fetch function 
        - make sure route.js in correct folder (ex: task folder)
- RangeError: Invalid time value
    - solution: need to place date string into new Date object 

Questions
- should i allow task schema date entry to have min/max date 
- what is proper way to check session and routes for null/error checks
