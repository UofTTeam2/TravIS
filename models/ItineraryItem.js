// // Desc: ItineraryItem model will represent all ItineraryItem that are related to a tripSection.
// // =============================================================

// // Dependencies
// // =============================================================
// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');
// // =============================================================

// // Creating the ItineraryItem model
// // =============================================================
// class ItineraryItem extends Model {}
// // =============================================================

// // Creating the ItineraryItem table
// // =============================================================

// ItineraryItem.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true,
//         },

//         category: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },

//         title: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },

//         link: {
//             type: DataTypes.STRING,
//             allowNull: true,
//         },

//         image: {
//             type: DataTypes.STRING,
//             allowNull: true,
//         },

//         start_date: {
//             type: DataTypes.DATEONLY,
//             allowNull: false,
//             defaultValue: DataTypes.NOW,
//         },

//         start_time: {
//             type: DataTypes.TIME,
//             defaultValue: DataTypes.NOW,
//         },

//         end_date: {
//             type: DataTypes.DATEONLY,
//             allowNull: false,
//             defaultValue: DataTypes.NOW,
//         },

//         end_time: {
//             type: DataTypes.TIME,
//             defaultValue: DataTypes.NOW,
//         },

//         expense: {
//             type: DataTypes.DECIMAL(10, 2),
//             allowNull: false,
//             validate: {
//                 isDecimal: true,
//             },
//         },

//         notes: {
//             type: DataTypes.STRING,
//             allowNull: true,
//         },

//         trip_section_id: {
//             type: DataTypes.INTEGER,
//             references: {
//                 model: 'tripsection',
//                 key: 'id',
//             },
//         },
//     },
//     {
//         sequelize,
//         timestamps: true,
//         freezeTableName: true,
//         underscored: true,
//         modelName: 'itineraryitem',
//     }
// );
// // =============================================================

// // Exporting the ItineraryItem model
// // =============================================================
// module.exports = ItineraryItem;
