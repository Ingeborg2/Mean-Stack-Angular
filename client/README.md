# Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## How to clone/install

Go to: https://github.com/Ingeborg2/Mean-Stack-Angular
(Mean = MongoDB, Express, Angular, Nodejs).

Clone or download: Copy the url (https://github.com/Ingeborg2/Mean-Stack-Angular.git)

Open Git Bash or Command Line.

Change the current working directory to the location where you want to create the cloned directory.

Type git clone, and then paste the URL you copied and enter:
git clone https://github.com/Ingeborg2/Mean-Stack-Angular.git

In the editor of your choice open the Mean-Stack-Folder and in both /client and /backend: npm install

Mean-Stack-Folder/client:	ng serve
Mean-Stack-Folder/backend:	node server.js
(Remark: make sure mongoDB is running before starting the server)

Go to localhost:4200


## Seeing the functionalities in action:

Register
	To login, you need to register first. 
	When registered, you will be redirected to login page.
Login	
	Login in will give you access to more functionalities. 
	Navigation bar changes, when logged in.
Profile
	When logged in, you will see the username and email, you have registered 	and used to log in.
Add Gem
	You can add a gemstone, when you are logged in.  The new gemstone will 	appear in the gemstones page.
Gemstones
	When logged in, you can edit or delete gemstones (only the ones you have created)
	You can click on headings to sort the gemstones.
Logout
	Navigation bar changes.
