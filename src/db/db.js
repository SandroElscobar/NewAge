const mongoose = require('mongoose')

module.exports = {
    connect: DB_HOST => {
        mongoose.connect(DB_HOST)
            .then(() => console.log(`База данных запущена на ${DB_HOST}`))
            .catch(err => console.log(`Произошла ошибка ${err}`))
    },
    close: () => {
        mongoose.connection.close()
    }
}