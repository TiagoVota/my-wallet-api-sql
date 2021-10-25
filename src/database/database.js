import pg from 'pg'
import password from './password.js'


const { Pool } = pg

const connection = new Pool ({
	host:	'localhost',
	port: 5432,
	user: 'postgres',
	password,  // password string
	database: 'mywallet'
})


export default connection
