# api-server

## Project: The Timeless Tower

## Author: Tech-Flamingo Group

- [Ash Uppal](https://github.com/ashuppal)
- [Brenda Jow](https://github.com/brenda70904)
- [Martin Hansen](https://github.com/sp00nes)
- [Steve Gant](https://github.com/stevengant)

## Problem Domain

  The purpose of the text-based game is to engage the player in an interactive and immersive storytelling experience. The player can make choices that affect the outcome of the story which engages the user further into the game experience.

![gameScreenshot](./assets/screenshot%20of%20games.png)

### Links and Resources

- [Tech-Flamingos - client repo](https://github.com/Tech-Flamingos/client)
- [Tech-Flamingos - server repo](https://github.com/Tech-Flamingos/server)

### test refernece

  Thank you [dungeons and data](https://github.com/dungeons-and-data/dungeons-and-data/blob/staging/server/models/User.js) for the help with tests.

### Setup

.env requirement:

- DATABASE_URL
- PORT

### How to initialize/run your application (where applicable)

node index.js

### How to use your library (where applicable)

Features / Routes

- /signup : allow user to signup, user data will store in MongoDB.

- /signin : return user can use signin route to aceess the game again.

- join Room, mulitple users can join the same room to play the game.

Role Based Access Control: user, writer, admin.

### Tests

#### How do you run tests?

- npm test

#### Any tests of note?

- SignIn, Signup routes

- Role based access

- User verification

- Password verification

- Database verification

#### Describe any tests that you did not complete, skipped, etc

 - skip testing inquirer

### UML

![midtermUML](/assets/midterm-UML%20(1).png)
