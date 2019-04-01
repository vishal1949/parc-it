# Parc-it
## Parking At Residential Communities
An application/website that gives users the ability to host a private parking spot (e.g. driveway, garage) and for other users to book those parking spots for a time frame (hourly, daily, weekly, monthly, etc). With this applicaiton, we hope to decrease the stress of parking in major cities.

## Description
* An application/website that gives users the ability to host a private parking spot (e.g. driveway, garage) and for other users to book those parking spots for a specified time frame (hourly, daily, weekly, monthly, etc).

##Technologies
This application is built using the M.E.R.N stack. 
For the backend, there is Mongo DB and for the database, Express.js, and Node.js for the framework that is used in the backend.
The frontend is built using JavaScript with React.js and Redux.
Amazon Web Services(AWS) S3 is implmeneted for cloud based image storage and is used to save new images or fetch existing images
Google Maps API is featured and used to render locations of possible parking spots.
Google Maps Geocoder is used to save the address of a newly created listing in terms of 'Latitude' and 'Longitude' and is later used for search filtering based on 'Latitude' and 'Longitude'.