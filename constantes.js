const chaineConnexion = {
    client: 'mssql',
    connection: {
        host: 'sv55.cmaisonneuve.qc.ca',
        user: '4D1Equipe01',
        password: 'bjs937',
        database: '',
        options: {
            enableArithAbort: false,
        },
    },
    pool: { min: 0, max: 7 },
    useNullAsDefault: true,
};

// eslint-disable-next-line import/prefer-default-export
module.exports = chaineConnexion;
