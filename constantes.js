const chaineConnexion = {
    client: 'mssql',
    connection: {
        host: 'sv55.cmaisonneuve.qc.ca',
        user: '4D1Equipe3',
        password: '123456',
        database: 'CRTPEquipe3',
        options: {
            enableArithAbort: false,
        },
    },
    pool: { min: 0, max: 7 },
};

// eslint-disable-next-line import/prefer-default-export
module.exports = chaineConnexion;
