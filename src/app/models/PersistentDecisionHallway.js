/* eslint-disable class-methods-use-this */
import pg from 'pg'
import { Sequelize } from 'sequelize'
import { PersistentDecisionRoom, PersistentUserSelection } from './PersistentDecisionRoom'

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
    const room = await PersistentDecisionRoom(sequelize).findOne({
      where: {
        id: anId,
      },
    })
    return room
  }

  async addSelection(serializeSelection) {
    let persistedSelection
    if (serializeSelection.value.trim() !== '') {
      persistedSelection = PersistentUserSelection(sequelize).create({
        userName: serializeSelection.user,
        roomId: serializeSelection.roomId,
        value: serializeSelection.value,
      })
    }
    return persistedSelection
  }

  async countSelectionsIn(aRoomID) {
    return PersistentUserSelection(sequelize).count({
      where: {
        roomId: aRoomID,
      },
    })
  }
}

export default new PersistentDecisionHallway()
