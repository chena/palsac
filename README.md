# Pal-Sac

A web application for Post-A-Letter Social Activity Club (Pal-Sac), allowing people to see upcoming events or start a new one.

## Usage

Build with Maven:

```
mvn clean package
```
Start the server:

```
java -jar target/palsac-0.0.1-SNAPSHOT.jar server src/main/resources/config.yaml
```
Visit the running app at:

```
http://localhost:8080/
```

## Tech Stack

* [Dropwizard](https://dropwizard.github.io/dropwizard/) for REST backend.
* [MongoDB](http://www.mongodb.org/) for data storage.
* [Guice](https://code.google.com/p/google-guice/) for dependency injection.
* [Backbone](http://backbonejs.org/) for SPA frontend.
* [RequireJS](http://requirejs.org/) for AMD.
* [Google Maps API](https://developers.google.com/maps/documentation/javascript/) for displaying and searching for locations.
* [Facebook API](https://developers.facebook.com/docs/javascript) for user login
* [Twitter Bootstrap](http://getbootstrap.com/) for styles.
