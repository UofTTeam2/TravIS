// Desc: Creating a sequelize model for the Session table
// =======================================================

// Dependencies
// =============================================================
const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// =============================================================

// Creating the Session model
// =============================================================

const Session = sequelize.define('sessions', {
    sid: {
        type: DataTypes.STRING,
        primaryKey: true,
    },

    expires: {
        type: DataTypes.DATE,
    },
    data: {
        type: DataTypes.TEXT,
    },
});
// =============================================================

// Exporting the Session model
// =============================================================
module.exports = Session;
