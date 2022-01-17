module.exports = function(sequelize, DataTypes){
    const lists = sequelize.define('Lists',{
        name : {
            type: DataTypes.STRING(20),
            allowNull: false // 칼럼의 값이 없어도 되는지 여부
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