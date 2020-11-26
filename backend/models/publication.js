const express = require('express');





module.exports = (sequelize,DataTypes) => {
    const Publication = sequelize.define("publication",{

        idUser : {
            type : DataTypes.INTEGER,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        ImageSource : {
            type : DataTypes.STRING,
            
        },
        Texte : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        Points : {
            type : DataTypes.DECIMAL,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },

        
        titre : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            },
        
        },
        auteur : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            },
        }

    });

    return Publication
}

