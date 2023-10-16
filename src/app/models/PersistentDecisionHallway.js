/* eslint-disable class-methods-use-this */
import pg from 'pg'
import { Sequelize } from 'sequelize'
import PersistentDecisionRoom from './PersistentDecisionRoom'
import PersistentUserSelection from './PersistentUserSelection'

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

  async addSelections(selections) {
    const persistedSelections = selections.map(
      (selection) => PersistentUserSelection(sequelize).create({
        user: selection.user().serialized(),
        roomId: selection.roomId(),
        value: selection.value(),
      }),
    )

    return persistedSelections
  }
}

export default new PersistentDecisionHallway()
