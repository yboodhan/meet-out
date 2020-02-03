# meet-out

## About:
Meet-Out is a scheduling and social media app to promote gathering outside to do fun, exercise-driven activities. This app was created by Yashoma Boodhan (Github: yboodhan), Kennan Salisbury (Github: kennansalisbury) and Nick Quandt (Github: nickubed).

#### Features/Technologies:

This application contains local authorization with BCrypt to salt and hash user password. JSON web tokens are used to authorize users to view certain pages and to keep the user logged in. React is used in conjuction with reactstrap, font-awesome, moment, cloudinary, react-big-calendar, and other dependencies to create the front-end. Rowdy-logger is used to generate a table of all methods and paths.

This app uses Typscript, Javascript, MongoDB, Express, React, and Node. In addition, it incorporates many APIs, and node-modules.

#### Accessing the application:
**Link:** https://meeting-out.herokuapp.com

> Note: The back-end server file is deployed to https://meeting-out-server.herokuapp.com.

## User Profile:

Meet Out users are active people looking for a way to build community around the activities that they like to do outside. They want an app that provides them the opportunity to:
* Plan activities and potentially share with others
* Join others in their planned activities
* Discover new locations where they can do their favorite activities
* Have accountability for staying active and involved in their community

Within the app, they can:
* Schedule an activity in which they can share event details, location information and specify a timeframe.
* Decide whether they want others to see and be able to join their meet, or if they want to keep it private.
* Reschedule their meet or edit their meet details, or cancel it altogether
* Look at others' public meet details, see who else is attending, and join or leave that meet.
* Edit profile picture and details while logged in.


## Approach:

We brainstormed as a group to discuss ideas, features, and plans. We used Trello to track workflow and tasks.

* We drew a wireframe and discussed features and stylistic preferences, and defined our models.

![wireframes](./img/wireframes.png)

* We proceeded to learn the basics of front-end and back-end Typescript and created a basic app with functional local auth.

* Basic routes were created and stubbed on the back-end and basic components were created and stubbed on the front-end. Models were created and tested.

* Basic functionality was tested and confirmed between the database, client, and server. Routes were developed to incorporate interaction with the models (connect app functionality with database) and components on the front-end were developed to fetch and present data to the user.

* Changes were committed after each iteration or noteworthy change in code.

* The `readme.md` file was edited to summarize the app.

## Further Goals:
With additional time, cleaner and more DRY code will be implemented. In particular, code can be improved when defining types on the front-end and back-end to ensure that the format of objects being sent and received are of the same format. 

Features we would like to implement moving forward include: 

* Functionality to invite others to your private and public events, maybe implementing a social network of friends you can connect with and/or follow
* Categories for meets that allow users to filter meets and assign new meets accordingly
* Easier location search functionality that allows for quick search of locations by name that will populate address information for the user. (i.e. search for "Rattlesnake ridge" and save it's address all within the create or edit form)
* Allow users to message and communicate through the app

## Routes

### Back-end
| Method | Path | Purpose |
| ------ | --------------- | ----------------- |
| POST    | /auth/login   | logs in user |
| POST   | /auth/signup | signs up user |
| GET    | /meet/:id    | gets all public meets for all users, plus all private & public meets for current user; also populates all users attending the found meets |
| PUT    | /meet/:id    | edits a specified meet's details |
| POST   | /meet        | creates a new meet |
| DELETE | /meet/:id    | deletes a meet |
| GET    | /profile/:id | sends profile information for current user |
| PUT    | /profile     | edits profile information for current user |
| GET    | *            | catch all/error page for server - sends 404 |

### Front-end
| Path | Purpose |
| --------------- | ----------------- |
| /     | login & sign up page |
| /home | home page for logged in user - shows calendar and list of upcoming meets |
| /profile   | shows profile information for current user  |
| /profile/edit   | renders form to edit profile information for current user |
| /create        | renders form to create a new meet |
| /show   | shows full page of details for a specified meet |
| /edit | renders form to edit meet details |


### A Haiku for Typescript

# Types fly high over code
# Wait why is that not working
# Stupid. Why "never".
