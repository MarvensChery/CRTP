const chaineConnexion = {
    client: 'mssql',
    connection: {
        host: '127.0.0.1',
        user: 'sa',
        password: '123',
        database: '4D1Equipe06',
        options: {
            enableArithAbort: false,
        },
    },
    pool: { min: 0, max: 7 },
};

// eslint-disable-next-line import/prefer-default-export
module.exports = chaineConnexion;
