<p align="center">
  <img src="fixtures/logo.svg" alt="Logo" width="200" height="100">

  <h3 align="center">VOD Streaming App</h3>

  <p align="center">
   Adaptive Video On Demand Streaming Application
  </p>
</p>

## About The Project

video-on-demand adaptive streaming service built with node-js.

## Features

List the ready features in this project:

- Elasticsearch for movie searching, filtering, and sorting.
- IMDB scraper for seeding movie details when creating new entries in the admin panel.
- Bull Queue system for queueing transcoding tasks.
- FFmpeg for transcoding.
- HLS adaptive streaming working on ios, Andriod and web browsers
- Nginx as a reverse proxy for node-js application
- Nginx as a media file server
- Nginx Jwt Module + Lua to add authorization for accessing content depending on users' subscriptions
- Stripe as payment gateway.
- Simple Admin panel to crud movies.

## Diagram explaining Used Services

<p align="center">
  <img src="fixtures/services.jpg" alt="Demo">
</p>

## Usage

1. Clone the repo

   ```sh
   git clone https://github.com/civilcoder55/streaming-app.git
   ```

2. update env file

3. run containers

   ```sh
   sudo docker-compose up -d
   ```

4. access website at
   ```sh
   http://localhost:8080
   ```
## TO DO

- [x] Add scrapy containter and endpoint
- [x] Add stripe integrations
- [ ] Add mail service
- [ ] Enhance admin panel Queue 
- [ ] Add more features to the admin panel  

## Credits
html template used in this app was purchased from https://themeforest.net/item/flixgo-online-movies-tv-shows-cinema-html-template/22538349#  

## Screenshots
<h3 align="center">folder structure</h3>
<p align="center"><img src="fixtures/folder structure.png"></p>
<br>
<h3 align="center">different screenshots</h3>
<p align="center"><img src="fixtures/1.png"></p>
<p align="center"><img src="fixtures/2.png"></p>
<p align="center"><img src="fixtures/3.png"></p>
<p align="center"><img src="fixtures/4.png"></p>
<p align="center"><img src="fixtures/5.png"></p>
<p align="center"><img src="fixtures/6.png"></p>
<p align="center"><img src="fixtures/7.png"></p>
<p align="center"><img src="fixtures/8.png"></p>
<p align="center"><img src="fixtures/9.png"></p>
<p align="center"><img src="fixtures/10.png"></p>
<p align="center"><img src="fixtures/11.png"></p>
<p align="center"><img src="fixtures/12.png"></p>
<p align="center"><img src="fixtures/13.png"></p>
<h3 align="center">imdb parser</h3>
<p align="center"><img src="fixtures/14.gif"></p>
<br>

<!-- ## TO DO

-   [x]. -->
