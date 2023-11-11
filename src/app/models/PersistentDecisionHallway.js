/* eslint-disable class-methods-use-this */
import pg from 'pg'
import { Sequelize } from 'sequelize'
import { PersistentDecisionRoom, PersistentUserSelection, PersistentUserVotation } from './PersistentDecisionRoom'

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

  async getAllSelections(id) {
    const selections = await PersistentUserSelection(sequelize).findAll({
      where: {
        room_id: id,
      },
    })
    const uniqueSelections = selections.filter((selection, index, self) => {
      const lowerCaseValue = selection.value.toLowerCase().replace(/\s+/g, '')
      const firstIndex = self.findIndex((s) => s.value.toLowerCase().replace(/\s+/g, '') === lowerCaseValue)
      return index === firstIndex
    })
    return uniqueSelections
  }

  async countSelectionsIn(aRoomID) {
    return PersistentUserSelection(sequelize).count({
      where: {
        roomId: aRoomID,
      },
    })
  }

  async addVotation(userVotation) {
    let persistedVotation
    if (userVotation.vote.trim() !== '') {
      persistedVotation = PersistentUserVotation(sequelize).create({
        userName: userVotation.user,
        roomId: userVotation.roomId,
        vote: userVotation.vote,
      })
    }
    return persistedVotation
  }

  async countDifferentVotationsIn(aRoomID) {
    const result = await sequelize.query(`
    SELECT COUNT(DISTINCT "user_name") AS "count"
    FROM "user_votations"
    WHERE "room_id" = :roomID
  `, {
      replacements: { roomID: aRoomID },
      type: Sequelize.QueryTypes.SELECT,
    })

    return result[0].count
  }

  async getWinnerOption(id) {
    const result = await sequelize.query(`
      SELECT "vote", COUNT(*) AS "count"
      FROM "user_votations"
      WHERE "room_id" = :roomID
      GROUP BY LOWER(REPLACE("vote", ' ', ''))
      ORDER BY "count" DESC
      LIMIT 1
    `, {
      replacements: { roomID: id },
      type: Sequelize.QueryTypes.SELECT,
    })

    return result[0].vote
  }
}

export default new PersistentDecisionHallway()
