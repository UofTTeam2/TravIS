# TravIS: Travel Itinerary Management Application
[![latest packaged version(s)](https://repology.org/badge/latest-versions/r:bcrypt.svg)](https://repology.org/project/r:bcrypt/versions)

![TravIS](./public/images/TravIs-Logos/android-chrome-192x192.png)

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![jQuery](https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![Markdown](https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Insomnia](https://img.shields.io/badge/Insomnia-black?style=for-the-badge&logo=insomnia&logoColor=5849BE)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

---

## Description

>TravIs is a web-based application designed to simplify travel itinerary management for frequent travelers. This application provides users with the ability to effortlessly create and manage their trip itineraries, ensuring efficient travel planning and organization. Travelers can create trips, add destinations and activities, access travel recommendations, engage with the travel community, track expenses, and more.

---

## Table of Contents

- [TravIS: Travel Itinerary Management Application](#travis-travel-itinerary-management-application)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Option one: Using Node.js](#option-one-using-nodejs)
    - [Option2:](#option2)
  - [Usage](#usage)
  - [Demo](#demo)
  - [Technologies Used](#technologies-used)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Database](#database)
    - [Security](#security)
  - [Features](#features)
  - [Credits](#credits)
  - [Contributing](#contributing)
  - [Testing](#testing)
  - [License](#license)
  - [Contact](#contact)

---

## Installation

### Option one: Using Node.js
_To get started with TravIs on your local machine, follow these steps:_

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies.
4. Set up your environment variables in a `.env` file, including database configuration and any API keys.
5. Initialize the database schema and seed data.
6. Start the application.
7. Access the application in your web browser at `http://localhost:3001`.

### Option2:
_Click on the following link:_

[Link to deployed application on Heroku](https://travis231017-9762a24c277b.herokuapp.com/)

---

## Usage

_TravIs offers an intuitive interface for managing trip itineraries. Here's how to use the application:_

1. **Create a Trip**:
- Log in to TravIs.
- Navigate to the "Create Trip" section.
- Input trip details, including name, start date, end date, and a brief description.

2. **Edit Trip Details**:
- If you've already created a trip, you can edit the trip details by updating the trip name, start date, end date, and description.

3. **Build an Itinerary**:
- Add destinations, activities, accommodation, restaurants, and transportation methods to your itinerary.
- Specify details for each item, such as name, date, time, location, and additional notes.

4. **Edit Itinerary Items**:
- While editing an existing itinerary, you can make changes to any itinerary item, and the changes will be saved and reflected in the itinerary.

5. **View Images in Itinerary**:
- If you've added images to your itinerary items, you can view the relevant images associated with each item.

6. **Travel Recommendations**:
- When planning a trip, check the "Recommendations" section for a specific destination to see suggestions for activities, attractions, restaurants, and accommodations.

7. **Detailed Recommendations**:
- Click on a recommendation to access detailed information, user reviews, and the option to make a booking if available.

8. **Travel Community and Social Features**:
- Share your itinerary with others by generating a unique link or inviting specific users to view it.
- Engage with the travel community by posting on the forum board, categorizing your posts, and interacting with other users' posts and comments.

9. **Expense Tracker**:
- Add costs to your itinerary items.
- View the "Expense Tracker" section to see a breakdown of the total trip cost, categorized by items such as accommodation, transportation, and activities.
- Update costs while editing your itinerary, and the expense tracker will recalculate and reflect the updated costs.

---

## Demo

_Click on the Following link:_
[Link to deployed application on Heroku](https://travis231017-9762a24c277b.herokuapp.com/)

---

## Technologies Used

### Frontend

- **HTML/CSS**: Crafted to provide a user-friendly and responsive interface.
- **JavaScript**: Implemented for dynamic content updates, user interactions, and API requests.
- **Handlebars.js**: Used for efficient dynamic content generation.

### Backend

- **Node.js & Express.js**: Handled backend logic, server configuration, routing, and API management.
- **Express-session & connect-session-sequelize**: Ensured a personalized user experience through effective session management.
- **bcrypt**: Guaranteed data transmission security and user authentication.
- **Chart.js, Multer npm package, Amadeus npm package, body-parser npm package**: Leveraged various libraries and packages to enhance functionality and user experience.

### Database

- **MySQL & Sequelize ORM**: Stored and managed user data, trip details, itineraries, and other essential data using a relational database management system.

### Security

- **Dotenv**: Securely stored and managed sensitive information, such as API keys, for enhanced data protection.
- **Secure Data Transmission**: Implemented HTTPS to ensure secure data transmission and enforced data validation and sanitation to prevent XSS and SQL injection attacks.

---

## Features

- Effortless trip itinerary creation and management.
- Comprehensive travel recommendations for activities, attractions, restaurants, and accommodations.
- Engaging travel community and social features, including forum boards.
- Expense tracking with a breakdown of costs by category.
- Secure user authentication and data protection.

---

## Credits

>We would like to extend our gratitude to the creators and contributors of the following resources, which have been instrumental in the development of TravIS:

 - [W3](https://www.w3schools.com/howto/howto_css_modals.asp)
 - [W3](https://www.w3schools.com/java/java_files_read.asp)
 - [Express](https://github.com/expressjs/session#readme)
 - [Express](https://github.com/expressjs/session#cookie)
 - [Express](https://expressjs.com/en/guide/using-middleware.html)
 - [Express](https://expressjs.com/en/4x/api.html#res.redirect)
 - [Express](https://expressjs.com/en/4x/api.html#res.json)
 - [Express](https://expressjs.com/en/4x/api.html#res.render)
 - [Express](https://expressjs.com/en/4x/api.html#router.METHOD)
 - [Sequelize](https://sequelize.org/docs/v6/core-concepts/model-basics/)
 - [Sequelize](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)
 - [Sequelize](https://sequelize.org/docs/v6/core-concepts/model-querying-finders/)
 - [Sequelize](https://sequelize.org/docs/v6/core-concepts/assocs/)
 - [Sequelize](https://sequelize.org/docs/v6/other-topics/hooks/)
 - [W3](https://www.w3schools.com/js/js_array_iteration.asp)
 - [MDN](https://developer.mozilla.org/en-US/docs/Web)
 - [ChatGPT](https://chat.openai.com/)
 - [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)
 - [CSS-Tricks](https://css-tricks.com/almanac/properties/t/transition/)
 - [W3](https://www.w3schools.com/css/css3_animations.asp)
 - [lambdatest](https://www.lambdatest.com/blog/css-animations-tutorial/)
 - [handlebarsjs](https://handlebarsjs.com/guide)
 - [npmjs](https://www.npmjs.com/package/amadeusnpm )
 - [Amadeus](https://developers.amadeus.com/)

---

## Contributing

Contributions to TravIS are welcome! Feel free to check the [issues page](https://github.com/UofTTeam2/TravIS/issues) for open tasks or propose new features.

---

## Testing

_The application's functionality meets the outlined acceptance criteria and has been tested manually._

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

- If you have any questions or feedback regarding TravIs, please reach out to us at [TravISGmail](mailto:uoftp2.team2@gmail.com). We value your input and look forward to assisting you in your travel planning journey. Safe travels!
- You can also visit our GitHub: [GitHub](https://github.com/UofTTeam2/TravIS)
