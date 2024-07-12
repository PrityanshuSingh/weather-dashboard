# Weather Dashboard

## Overview

Weather Dashboard is a web application built using React and Material-UI, designed to provide current weather information and forecasts for different cities. Users can search for cities, view detailed weather data, and visualize temperature trends using interactive charts.

### Video Demo
Working video demo of the Weather Dashboard:



## Features

### User-Focused Features:

- **User Authentication**: Optional feature allowing users to sign up, log in, and log out. User preferences, such as favorite cities, are stored in the user profile.
  
- **Search Functionality**: Enables users to search for different cities and fetch real-time weather data using the OpenWeatherMap API.
  
- **Display Current Weather**: Shows current weather information for the selected city, including temperature, humidity, wind speed, and weather conditions.
  
- **7-Day Forecast**: Provides a detailed 7-day weather forecast for the selected city, displaying daily temperatures, weather conditions, and precipitation.

- **Data Visualization**: Implements charts using Chart.js to visualize temperature trends over the next 7 days, enhancing the user experience with interactive graphical representations.

- **Responsive Design**: Ensures the application is fully responsive and optimized for various screen sizes, ensuring a seamless experience on both desktop and mobile devices.

- **Error Handling**: Gracefully handles errors such as invalid city names or issues with fetching weather data, providing informative messages to users.

### Optional Features:

- **Favorite Cities**: Allows users to save their favorite cities and quickly access weather information for those locations.
  
- **Weather Alerts**: Implement a feature to display weather alerts or notifications based on real-time data updates.
  
- **Localization Support**: Supports displaying weather information in different languages based on user preferences.

## Tech Stack

- **Frontend**: React.js, Material-UI
- **Charts**: Chart.js
- **API**: OpenWeatherMap API for weather data
- **Styling**: Material-UI components for a consistent and modern design

## How to Run Locally

To run the Weather Dashboard locally on your machine, follow these steps:

1. **Clone Repository**:
   ```bash
   git clone https://github.com/PrityanshuSingh/weather-dashboard.git
   ```

2. **Navigate to Project Directory**:
   ```bash
   cd weather-dashboard
   ```

3. **Install Dependencies**:
   Install the required node modules and dependencies for the project.
   ```bash
   npm install
   ```
   
4. **Set Up Environment Variables**"
   - Create a .env file in the root directory.
   - Add your OpenWeatherMap API key:
    ```
    REACT_APP_OPENWEATHERMAP_API_KEY=your-api-key
    ```

5. **Start Development Server**:
   ```bash
   npm start
   ```

6. **Access Local Deployment**:
   Open your browser and navigate to `http://localhost:3000` to view the Weather Dashboard locally.


Feel free to reach out for any inquiries or assistance regarding Weather Dashboard. Happy coding and weather hunting!


