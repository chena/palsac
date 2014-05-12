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

* [Dropwizard](https://dropwizard.github.io/dropwizard/) for the back-end.
* [Backbone](http://backbonejs.org/) for the front-end.
* [RequireJS](http://requirejs.org/) for AMD.
* [Google Maps API](https://developers.google.com/maps/documentation/javascript/) for displaying and searching for locations.
* [Twitter Bootstrap](http://getbootstrap.com/) for styles.
