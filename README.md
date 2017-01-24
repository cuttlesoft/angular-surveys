# angular-surveys
Angular.js survey / form builder inspired by Google Forms

[Bootstrap Demo](http://mwasiluk.github.io/angular-surveys)

[Material Design Demo](http://mwasiluk.github.io/angular-surveys/material)

## Bower

You can install this package through `Bower` :

    bower install angular-surveys --save

## Wiki
[Directives](https://github.com/mwasiluk/angular-surveys/wiki/Directives)

##Using the library

The library allows users to build a form in a Google-forms style interface. It outputs a JSON object representing the form which is then rendered by Angular.
Each JSON form-data file has an elements object representing the questions. Form elements are rendered differently by AngularJS depending on their question type (text, checkbox, radio, range, etc)

## Ionic
###Setting up for development

You'll need to run the project in two terminal windows. One is for the Ionic project. The other is for the files you are changing and building.

* make a lib-dev folder in the Ionic project www/ folder
* change the imported angular-surveys/dist scripts to source from www/lib-dev/dist rather than lib/dist
* clone angular-surveys into the lib-dev folder
* npm install && bower install (if you have issue with bower check your .bowerrc to see where bower files are installing)

**Don't forget to import the ionic-tpls.min.js in your index.html**

* run ionic serve in the Ionic project folder
* run gulp watch in the lib-dev folder
* the ng-submit on the that calls the ctrl.saveResponse() function references a submit function that needs to be added to the top level app controller.

###Using the form viewer in development

* First build a form using the Form Builder from the [Bootstrap example](http://wasiluk.io/angular-surveys/)
* The data will be placed into the model as a JSON object
* That data needs to be placed in form-data.json, which is imported using a $http.get in the app.js. You can save it locally in the www folder for testing
* In the app.js make sure the $http.get for the response-data.json is commented out. Otherwise you might have issues with your response data.

The index.html calls the mw-form-viewer directive which passes in a bunch of data.
mw-form-viewer renders the mw-form-viewer-content.html template.
That template calls the mw-form-question directive which actually makes the various question templates.
