const chaineConnexion = {
    client: 'mssql',
    connection: {
        host: 'SV55.cmaisonneuve.qc.ca',
        user: '4D1Equipe2',
        password: '123456',
        database: 'CRTPEquipe2',
        options: {
            enableArithAbort: false,
        },
    },
    pool: { min: 0, max: 7 },
};

// eslint-disable-next-line import/prefer-default-export
module.exports = chaineConnexion;
