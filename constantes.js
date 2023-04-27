const chaineConnexion = {
    client: 'mssql',
    connection: {
        host: 'sv55.cmaisonneuve.qc.ca',
        user: '4D1Equipe5',
        password: '123456',
        database: 'CRTPEquipe5',
        options: {
            enableArithAbort: false,
        },
    },
    pool: { min: 0, max: 7 },
};

// eslint-disable-next-line import/prefer-default-export
module.exports = chaineConnexion;