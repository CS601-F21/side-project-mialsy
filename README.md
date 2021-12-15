Side Project - CoC Game Helper 
============

## Introduction
This app is inspired from my experience with playing COC TRPG with my friends - that we cannot find a good app for us to roll dice, and keep track of players status. In COVID-days, I am definitely more obsessed than playing game remotely. Thus, I want to create such an app so that I can play "TRPG" (there is no table techinically) games with friends. 

## About CoC
CoC is the short for "Call of Cthulhu", it is "a horror fiction role-playing game based on H. P. Lovecraft's story of the same name and the associated Cthulhu Mythos" - from [wikipedia](https://en.wikipedia.org/wiki/Call_of_Cthulhu_(role-playing_game)).

### Game Setting
In the CoC game, there is usaully a keepr who is in charge of the game progress, and a few players (usually 1-5). The character in the game usually have status like hit points (HP), magic points (MP) like any RPG, but specially, in a CoC game, the character also has luck and sanity for status, which is originated from the idea that people lose sanity when seeing nightmare creactures. So in this app, I followed the same setting. 

### Roll a Dice!
The game progress of the CoC game is usually facilited by rolling a dice. Rolling a dice can represents a lot of things - from how much damage you created for a monster NPC, to things like how charming your character appear. Thus anohter key feature for this app is to roll a dice. 

## Features
In this game, the user can have two workflow:
- Create a game - this allow user to be the "Keeper" of the game, the user can name a game, set up characters for the game, and share the game room link with friends.
- Join a game as player - the user will be able to enter a link keeper provides, choose a character and play game as the choosen character. 
- In game - during game, the keeper will be able to manage game (update status of characters), and both keeper and player will be able to send chat messages, and roll a dice!

## Implementation 
The app is inplmeneted with a front end and backend seperated architecture. 

The frontend is built with react, with stomp client to send messages to socket channel, and antd components as UI building bricks.

The backend is built with Spring Boot. For simplicity of the code, the Lombok library was used for code generation of getters, setters, and builder of the models and POJOs.

## Run Code
- Backend(database config and setup required):
```
cd coc
java -jar  coc-0.0.1.jar
```
- Frontend:
```
cd client
npm install
npm start
```
