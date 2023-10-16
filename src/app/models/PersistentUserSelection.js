import { DataTypes } from 'sequelize'
import UserSelection from './UserSelection'

const PersistentUserSelection = (aSequelizeClient) => aSequelizeClient.define('UserSelection', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  value: {
    type: DataTypes.String,
    allowNull: false,
  },
}, {
  timestamps: true,
  underscored: true,
})

UserSelection.deserialize = (serializedRoom) => {
  const deserializedUserSelection = UserSelection.deserialize(JSON.parse(serializedRoom))
  return deserializedUserSelection
}

UserSelection.serialize = () => {
  const serializedUserSelection = this.getDataValue('serializedUserSelection')
  return JSON.parse(serializedUserSelection)
}

export default PersistentUserSelection
