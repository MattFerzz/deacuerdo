import { DataTypes } from 'sequelize'
import DecisionRoom from './DecisionRoom'
import UserSelection from './UserSelection'
import UserVotation from './UserVotation'

const PersistentDecisionRoom = (aSequelizeClient) => aSequelizeClient.define('DecisionRoom', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  settings: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  users: {
    type: DataTypes.JSON,
    allowNull: false,
  },
}, {
  timestamps: true,
  underscored: true,
})

PersistentDecisionRoom.deserialize = (serializedRoom) => {
  const deserializedRoom = DecisionRoom.deserialize(JSON.parse(serializedRoom))
  return deserializedRoom
}

PersistentDecisionRoom.serialize = () => {
  const serializedRoom = this.getDataValue('serializedRoom')
  return JSON.parse(serializedRoom)
}

const PersistentUserSelection = (aSequelizeClient) => aSequelizeClient.define('UserSelection', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roomId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  underscored: true,
})

PersistentUserSelection.deserialize = (serializedRoom) => {
  const deserializedUserSelection = UserSelection.deserialize(JSON.parse(serializedRoom))
  return deserializedUserSelection
}

PersistentUserSelection.serialize = () => {
  const serializedUserSelection = this.getDataValue('serializedUserSelection')
  return JSON.parse(serializedUserSelection)
}

const PersistentUserVotation = (aSequelizeClient) => aSequelizeClient.define('UserVotation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roomId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  vote: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  underscored: true,
})

PersistentUserVotation.deserialize = (serializedVotation) => {
  const deserializedUserVotation = UserVotation.deserialize(JSON.parse(serializedVotation))
  return deserializedUserVotation
}

PersistentUserVotation.serialize = () => {
  const serializedUserVotation = this.getDataValue('serializedUserVotation')
  return JSON.parse(serializedUserVotation)
}

export { PersistentDecisionRoom, PersistentUserSelection, PersistentUserVotation }
