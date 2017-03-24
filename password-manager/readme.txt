
How to get all dependencies/packages?
Go cmd and sure you are in the dir that package.json is and type "npm install"

How to start password-manager?
"nodemon start" in console inside password-manager's dir
it will run the server over http://localhost:3000

Where are the server details?
Under /password-manager/bin/www

Where are middleware defined?
Under /password-manager/app.js

Databases is MongoDB / Google Cloud SQL(optionally)
url : 'mongodb://127.0.0.1:27017/test'
mySql {
    host     : '127.0.0.1',
    user     : 'root',
    password : 'admin',
    database : 'food_db'
    }
to run mySql you need to run  proxy with google software.
