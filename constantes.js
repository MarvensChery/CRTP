const chaineConnexion = {
    client: 'mssql',
    connection: {
        host: 'sv55.cmaisonneuve.qc.ca',
        user: 'AppCRTP',
        password: '420-4D1',
        database: 'CRTP',
        options: {
            enableArithAbort: false,
        },
    },
    pool: { min: 0, max: 7 },
    useNullAsDefault: true,
};

// eslint-disable-next-line import/prefer-default-export
module.exports = chaineConnexion;
