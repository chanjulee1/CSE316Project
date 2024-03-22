# final-project-cse316

## Members of our team:

Name: Ulukbek Aitmatov
email: ulukbek.aitmatov@stonybrook.edu

Name: Chanju Lee
email: chanju.lee@stonybrook.edu

## Steps to start final project

After cloning the project, you have to go to client directory and run following command in the directory:

### `npm install`

Keep in mind, when you 'npm install', you should be inside the client directory. It will install all front end related packages. In my computer, I have installed tailwindcc and when I download project from the git, it does not require me to install tailwindcss. It shouldn't require you to install it since it is part of the 'packages.json' file as well. In case, you can look it in the internet.

Now, from the root directory, go to server directory and run following command in the directory:

### `npm install`

Keep in mind, when you 'npm install', you should be inside the server directory. It will install all back end related packages.

It will install all the required packages.

## Database - installation

My implementation of those requirements are given in the 'builddb.sql' file located in the root directory. Set up your mysql database as shown in the file.

Fix 'APP ENVIRONMENT VARIABLES' in .env file located in the server directory.

Now, if you have completed above steps, the project should be ready for running:

## Run the project

1. To start project, we need to first launch server in the terminal by going to server directory and typing:

### `npm run dev`

It will run server on port: 3000.

2. Now open new terminal, go to client directory and run following command in the directory:

### `npm run dev`

It will run server on port: 3001. 
