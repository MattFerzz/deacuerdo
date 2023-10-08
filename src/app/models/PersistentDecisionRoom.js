import { DataTypes } from 'sequelize'
import DecisionRoom from './DecisionRoom'

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

export default PersistentDecisionRoom
