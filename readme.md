##How to install:
1. Run WebApi project from Visual studio or Visual studio code
2. Open WebFrontend directory in terminal and type 'npm install' to install required dependencies

##Before running:
When you start WebApi project, you'll be redirected to the url of the API (pay attention to the port)
If you're running by visual code, the url is usually:
https://localhost:5001/
If you're running from Visual Studio, the url is usually:
https://localhost:44314/

The WebFrontend is by default set to communicate with API which is hosted on https://localhost:5001/
If this is not the correct URL, open WebFrontend/package.json and edit the following line:
"proxy": "https://localhost:5001/",      <--------- Set the correct URL here.

##Run
Start WebApi if you have not already
Open WebFrontend directory and type "npm start" in terminal, after around 30 seconds, you can visit the homepage at:
http://localhost:3000/





