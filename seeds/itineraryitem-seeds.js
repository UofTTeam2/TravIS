// // Desc: This file is Used to seed the ItineraryItem table in the database
// // =============================================================

// // Importing the ItineraryItem model
// // =============================================================
// const { ItineraryItem } = require('../models');
// // =============================================================

// // Creating the ItineraryItem seeds
// // =============================================================
// const itineraryItemData = [
//     {
//         category: 'food',
//         title: 'Breakfast',
//         linke: 'https://www.google.com',
//         image: 'https://www.google.com',
//         start_date: '2021-08-01',
//         start_time: '08:00:00',
//         end_date: '2021-08-01',
//         end_time: '09:00:00',
//         expense: 10.0,
//         notes: 'Breakfast at the hotel',
//         trip_section_id: 1,
//     },
//     {
//         category: 'food',
//         title: 'Lunch',
//         linke: 'https://www.google.com',
//         image: 'https://www.google.com',
//         start_date: '2021-08-01',
//         start_time: '12:00:00',
//         end_date: '2021-08-01',
//         end_time: '13:00:00',
//         expense: 15.0,
//         notes: 'Lunch at the hotel',
//         trip_section_id: 1,
//     },
//     {
//         category: 'food',
//         title: 'Dinner',
//         linke: 'https://www.google.com',
//         image: 'https://www.google.com',
//         start_date: '2021-08-01',
//         start_time: '18:00:00',
//         end_date: '2021-08-01',
//         end_time: '19:00:00',
//         expense: 20.0,
//         notes: 'Dinner at the hotel',
//         trip_section_id: 1,
//     },
//     {
//         category: 'activity',
//         title: 'Hiking',
//         linke: 'https://www.google.com',
//         image: 'https://www.google.com',
//         start_date: '2021-08-01',
//         start_time: '09:00:00',
//         end_date: '2021-08-01',
//         end_time: '12:00:00',
//         expense: 0.0,
//         notes: 'Hiking in the mountains',
//         trip_section_id: 2,
//     },
//     {
//         category: 'activity',
//         title: 'Sightseeing',
//         linke: 'https://www.google.com',
//         image: 'https://www.google.com',
//         start_date: '2021-08-01',
//         start_time: '13:00:00',
//         end_date: '2021-08-01',
//         end_time: '15:00:00',
//         expense: 0.0,
//         notes: 'Sightseeing in the city',
//         trip_section_id: 2,
//     },
//     {
//         category: 'activity',
//         title: 'Museum',
//         linke: 'https://www.google.com',
//         image: 'https://www.google.com',
//         start_date: '2021-08-01',
//         start_time: '15:00:00',
//         end_date: '2021-08-01',
//         end_time: '17:00:00',
//         expense: 10.0,
//         notes: 'Visit the museum',
//         trip_section_id: 2,
//     },
// ];
// // =============================================================

// // Creating and exporting the function to seed the ItineraryItem table
// // =============================================================
// const seedItineraryItems = () => ItineraryItem.bulkCreate(itineraryItemData);
// // =============================================================
// module.exports = seedItineraryItems;
