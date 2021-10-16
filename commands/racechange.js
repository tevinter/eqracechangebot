// !racechange playername race
module.exports = {
    name: 'racechange',
    description: 'Changes the race of the specified character',
    permissions: 'EQGM',
    syntax: '!racechange playername race',
    execute(msg, args){
        const playername = args[0]
        const race = args[1];
        const query = 'UPDATE `peq`.`character_data` SET `race`=(?) WHERE  `name`=(?);'
        const mariadb = require('mariadb');     // Mariadb connector library

        const pool = mariadb.createPool({
            host: process.env.DB_HOST, 
            port: process.env.DB_PORT,
            user: process.env.DB_USER, 
            password: process.env.DB_PWD,
            connectionLimit: 3
       });
        pool.getConnection()
            .then(conn => {
                console.log('connected ! connection id is ' + conn.threadId);
                conn.query(query, [race, playername])
                conn.release(); //release to pool
                msg.channel.send(`Race change for ${playername} successful`)
    })
            .catch(err => {
                console.log('not connected due to error: ' + err);
    });
    }
}