const express = require('express');





module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define("user",{
        prenom : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        nom : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        sexe : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        fonction : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        mail : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },

        type : {
            type : DataTypes.STRING
        },

        imageUrl : {
            type: DataTypes.STRING,
            validate : {
                notEmpty : true
            }
        }

    });

    return User
}


