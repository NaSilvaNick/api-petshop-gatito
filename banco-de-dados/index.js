import Sequelize from 'sequelize'
import config from 'config'

const instancia = new Sequelize(
  config.get('mysql.database'),
  config.get('mysql.user'),
  config.get('mysql.password'),
  {
    hist: config.get('mysql.host'),
    dialect: config.get('mysql.dialect')
  }
)

export default instancia
