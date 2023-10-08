/* eslint-disable class-methods-use-this */
import { Sequelize } from 'sequelize'
import sqlite3 from 'sqlite3'
import DecisionRoom from './DecisionRoom'
import DecisionRoomSettings from './DecisionRoomSettings'
import PersistentDecisionRoom from './PersistentDecisionRoom'
import User from './User'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './deacuerdo.db',
  dialectModule: sqlite3,
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
      DecisionRoomSettings.deserialize(room[0].settings),
      room[0].users.map((user) => User.deserialize(user)),
    )
  }
}

export default new PersistentDecisionHallway()
