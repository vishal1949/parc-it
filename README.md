# Parc-it
## Parking At Residential Communities
An application/website that gives users the ability to host a private parking spot (e.g. driveway, garage) and for other users to book those parking spots for a time frame (hourly, daily, weekly, monthly, etc). With this applicaiton, we hope to decrease the stress of parking in major cities.

[Live Demo](https://parc-it.herokuapp.com/#/)

## Description
* An application/website that gives users the ability to host a private parking spot (e.g. driveway, garage) and for other users to book those parking spots for a specified time frame (hourly, daily, weekly, monthly, etc). The goal is to make finding parking easy, fast, and convenient.

## Technologies
* This application is built using the M.E.R.N stack. 
* For the backend, there is Mongo DB and for the database, Express.js, and Node.js for the framework that is used in the backend.
* The frontend is built using JavaScript with React.js and Redux.
* Amazon Web Services(AWS) S3 is implmeneted for cloud based image storage and is used to save new images or fetch existing images
* Google Maps API is featured and used to render locations of possible parking spots.
* Google Maps Geocoder is used to save the address of a newly created listing in terms of 'Latitude' and 'Longitude' and is later used for search filtering based on 'Latitude' and 'Longitude'.

## Features
* Fully functioning user authentication with salted password
* Users can create a listing to host a parking spot for others to book
* Users can rent parking spots hosted by other users
* Google maps to show parking spots near the search results



## Google Map
Added Google maps to display real time hosted locations of parking spots in the San Francisco area. If a user would just like to look near a specific area in San Francisco, the map updates as the search filters the parkings. The search parameter is used to make an api request to Google maps geocoder, which is done asynchronously, and once a promise is returned, the map filters its markers based on the filtered out listings
### No Search
![Initial](/readmeImgs/map1.jpg)
### With Search
![Initial](/readmeImgs/map2.jpg)
### Code Snippet
![code](/readmeImgs/filter.jpg)

## Airbnb Opensource Calendar React Component
For the booking calendar, the application incorporates the Airbnb calendar. It features blocked out dates for bookings that have already been made. If a user is not logged in, the booking will not be created. It also renders errors when a user does not input any dates or half-filled dates.
![calendar](/readmeImgs/calendar.jpg)
### Code Snippet
![calendar](/readmeImgs/calendarCode.jpg)


## Future Plans
* Adding credit card api for making real transactions
* Update created bookings