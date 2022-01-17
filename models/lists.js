module.exports = function(sequelize, DataTypes){
    const lists = sequelize.define('Lists',{
        name : {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        age : {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        gender : {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        job : {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    })
    return lists;
}