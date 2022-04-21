/* eslint-disable linebreak-style */
module.exports = {
    client: 'mssql',
    connection: {
        host: 'sv55.cmaisonneuve.qc.ca',
        user: '4D1Equipe05',
        password: 'njt862',
        database: '4D1Equipe05',
        options: {
            enableArithAbort: false,
        },
    },
    pool: { min: 0, max: 7 },
};
