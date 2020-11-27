const express = require('express');





module.exports = (sequelize,DataTypes) => {
    const Comment = sequelize.define("commentaire",{

        user_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        Texte : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        auteur : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        idPost : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            },
        
        }

    });

    return Comment
}

