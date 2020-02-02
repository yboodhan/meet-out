# meet-out

## About:
Meet-Out is a scheduling and social media app to promote gathering outside to do fun, exercise driven activities. This app was created by Yashoma Boodhan (Github: yboodhan), Kennan Salisbury (Github: kennansalisbury) and Nick Quandt (Github: nickubed).

#### Features/Technologies:

This application contains local authorization with BCrypt to salt and hash user password. JSON web tokens are used to authorize users to view certain pages and to keep the user logged in. React is used in conjuction with SASS, reactstrap, font-awesome, moment, cloudinary, react-big-calendar, and other dependencies to create the front-end. Rowdy-logger is used to generate a table of all methods and paths.

This app uses Typscript, Javascript, MongoDB, Express, React, and Node. In addition, it incorporates many APIs, and node-modules.

#### Accessing the application:
**Link:** https://meeting-out.herokuapp.com

> Note: The back-end server file is deployed to https://meeting-out-server.herokuapp.com.

## Approach:

We brainstormed as a group to discuss ideas, features, and plans. We used Trello to track workflow and tasks.

* We drew a wireframe and discussed features and stylistic preferences.

* We proceeded to learn the basics of front-end and back-end Typescript and created a basic app with functional local auth.

* Basic routes were created and stubbed on the back-end and basic components were created and stubbed on the front-end. Models were created and tested.

* Basic functionality was tested and confirmed between the database, client, and server, routes were developed to incorporate interaction with the models (connect app functionality with database) and components on the front-end were developed to fetch and present data to the user.

* Changes were committed after each iteration or notewhorthy change in code.

* The `readme.md` file was edited to summarize the app.

## Further Goals:
With additional time, cleaner and more DRY code will be implemented. In particular, code can be improved when defining types on the front-end and back-end to ensure that the format of objects being sent and received are of the same format. Features that can be included moving forward include categories for meets that allow users to filter meets and assign new meets accordingly.



