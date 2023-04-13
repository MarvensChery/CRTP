const chaineConnexion = {
    client: 'mssql',
    connection: {
        host: 'sv55.cmaisonneuve.qc.ca',
        user: 'AppCRTP',
        password: 'Cours4D1',
        database: 'CRTP',
        options: {
            enableArithAbort: false,
        },
    },
    pool: { min: 0, max: 7 },
};

// eslint-disable-next-line import/prefer-default-export
module.exports = chaineConnexion;
