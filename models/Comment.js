// Desc: This file will represent the Comment model
// ****Note: Likes and Dislikes and be considered as a type of vote
// ==========================================================

// Dependencies
// =============================================================
// Import model, datatypes, and Op from sequelize
// Op is used to perform operations other than standard equals comparisons
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// =============================================================

// Create the Comment model, with methods
// =============================================================
// This Section will be used in further development
//to add and remove likes and dislikes
//to find comments with a minimum number of likes
//to find comments with a minimum number of dislikes
//to find comments with a maximum number of likes
//to find comments with a maximum number of dislikes
// =============================================================
class Comment extends Model {
    // // Method to add a like to a comment
    // async addLike(userId) {
    //     // Check if the user has already liked the comment
    //     if (!this.likes.includes(userId)) {
    //         // Add the user's ID to the likes array
    //         this.likes.push(userId);
    //         // Update the likes count in the database
    //         await this.save();
    //     }
    // }
    // // Method to remove a like from a comment
    // async removeLike(userId) {
    //     // Check if the user has liked the comment
    //     const index = this.likes.indexOf(userId);
    //     if (index !== -1) {
    //         // Remove the user's ID from the likes array
    //         this.likes.splice(index, 1);
    //         // Update the likes count in the database
    //         await this.save();
    //     }
    // }
    // // Class method to find comments with a minimum number of likes
    // static async findByMinLikes(minLikes) {
    //     const comments = await Comment.findAll({
    //         where: {
    //             likes: {
    //                 [Op.gte]: minLikes,
    //             },
    //         },
    //     });
    //     return comments;
    // }
    // // Method to find comments with the maximum number of likes
    // static async findByMaxLikes(maxLikes) {
    //     const comments = await Comment.findAll({
    //         where: {
    //             likes: {
    //                 [Op.gte]: maxLikes,
    //             },
    //         },
    //     });
    //     return comments;
    // }
    // // Method to add a dislike to a comment
    // async addDislike(userId) {
    //     // Check if the user has already disliked the comment
    //     if (!this.dislikes.includes(userId)) {
    //         // Add the user's ID to the dislikes array
    //         this.dislikes.push(userId);
    //         // Update the dislikes count in the database
    //         await this.save();
    //     }
    // }
    // // Method to remove a dislike from a comment
    // async removeDislike(userId) {
    //     // Check if the user has disliked the comment
    //     const index = this.dislikes.indexOf(userId);
    //     if (index !== -1) {
    //         // Remove the user's ID from the dislikes array
    //         this.dislikes.splice(index, 1);
    //         // Update the dislikes count in the database
    //         await this.save();
    //     }
    // }
    // // Class method to find comments with a minimum number of dislikes
    // static async findByMinDislikes(minDislikes) {
    //     const comments = await Comment.findAll({
    //         where: {
    //             dislikes: {
    //                 [Op.gte]: minDislikes,
    //             },
    //         },
    //     });
    //     return comments;
    // }
    // // Method to find comments with the maximum number of likes
    // static async findByMaxLikes(maxLikes) {
    //     const comments = await Comment.findAll({
    //         where: {
    //             likes: {
    //                 [Op.gte]: maxLikes,
    //             },
    //         },
    //     });
    //     return comments;
    // }
}
// =============================================================

// Initialize the Comment model
// =============================================================
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 1000],
            },
        },

        timestamp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },

        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },

        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);
// =============================================================

// Export the Comment model
module.exports = Comment;
