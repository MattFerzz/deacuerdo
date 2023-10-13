/* eslint-disable class-methods-use-this */
import pg from 'pg'
import { Sequelize } from 'sequelize'
import DecisionRoom from './DecisionRoom'
import DecisionRoomSettings from './DecisionRoomSettings'
import PersistentDecisionRoom from './PersistentDecisionRoom'
import User from './User'

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  port: 5432,
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
})

class PersistentDecisionHallway {
  async add(aRoom) {
    const room = PersistentDecisionRoom(sequelize).create({
      settings: aRoom.settings().serialized(),
      users: aRoom.users().map((user) => user.serialize()),
    })
    return room
  }

  includes(aRoom) {
    PersistentDecisionRoom(sequelize).findAll({
      where: {
        id: aRoom.id,
      },
    })
  }

  async roomAtId(anId) {
    const room = await PersistentDecisionRoom(sequelize).findAll({
      where: {
        id: anId,
      },
    })
    return new DecisionRoom(
      anId,
      DecisionRoomSettings.deserialize(room[0].settings),
      room[0].users.map((user) => User.deserialize(user)),
    )
  }
}

export default new PersistentDecisionHallway()
