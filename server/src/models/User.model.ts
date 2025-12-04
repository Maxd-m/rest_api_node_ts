import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

@Table({
    tableName: 'users'
})

class User extends Model {
    @Column({
        type: DataType.STRING(100),
        unique: true,
        allowNull: false
    })
    declare email: string

    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    declare password: string

    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    declare name: string

    @Default('user')
    @Column({
        type: DataType.ENUM('user', 'admin'),
        allowNull: false
    })
    declare role: 'user' | 'admin'
}

export default User
