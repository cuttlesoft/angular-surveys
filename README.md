# angular-surveys
Angular.js survey / form builder inspired by Google Forms

[Bootstrap Demo](http://mwasiluk.github.io/angular-surveys)

[Material Design Demo](http://mwasiluk.github.io/angular-surveys/material)

## Bower

You can install this package through `Bower` :

    bower install angular-surveys --save

## Wiki
[Directives](https://github.com/mwasiluk/angular-surveys/wiki/Directives)

## Ionic
###Setting up for development

You'll need to run the project in two terminal windows. One for the Ionic project. The other is for the files you are changing and building.

* make a lib-dev folder in the Ionic project www/ folder
* change the imported angular-surveys/dist scripts to source from www/lib-dev/dist rather than lib/dist
* clone angular-surveys into the lib-dev folder
* npm install && bower install (if you have issue with bower check your .bowerrc)

Your gulpfile builds a javascript file into the /dist folder based on the code in the /src folder.

To build for the ionic project, add the following to the buildModuleStream function in the gulpfile:
```javascript
var ionicTemplates = buildTemplates(tmpDir+'/templates/ionic/', moduleName, 'dist', destPrefix+'-ionic');
```
Don't forget to import the ionic-tpls.min.js in your index.html

* run ionic serve in the Ionic project folder
* run gulp watch in the lib-dev folder
