# cookingEventPlatform


Project Introduction

This is a web site for a online cooking school to create events for users to join. 
Users can login with thier google account to sign up for events. Users can also add events to their google calendar.  
Staff members can create events with a approved email account. 


This project is in a testing stage and the google api app is in not publish. 
Please provide you google email that you are going to use for testing to developer email:
kykwokaa@gmail.com
You would get response with 48 hours. 



Running locally
Clone the repository
In you machine, in the linux terminal, nevigate to the folder you want to store this project and then:

`git clone https://github.com/winniekwoknorth/cookingEventPlatform`

Open the folder in code editor or your choice. This project were build using Visual studio code.

Install dependencies
nevigate to backend folder
`npm install` or `npm install --force`
to install all the dependencies and dev dependencies.
and then navigate to `frontend\Our_Event_platform` 
`npm install` or `npm install --force`

creat .env files in the root of `backend` and `frontend\Our_Event_Platform` folder
the information in .env are confidential and only provide to the client of this project. 
(in this case, it will provide in the googleform for project submission)

Staff members need to provide thier email to web page developer for approval.
It can be done by navigate to `backend/data/staff.json` and add the staff email.

Make server running:
navigate to `backend`
run `node server.js` in you terminal
you sould see  Server running on http://localhost:5000

Open another terminal
navigate to `frontend\Our_Event_Platform`
run `npm run dev`

you should see 'your application running on 5173'
http://localhost:5173/
It have to be http://localhost:5173/

Start exploring the cuisine world. 

