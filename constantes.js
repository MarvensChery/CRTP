<<<<<<< HEAD
/* eslint-disable linebreak-style */
module.exports = {
    client: 'mssql',
    connection: {
        host: 'sv55.cmaisonneuve.qc.ca',
        user: '4D1Equipe05',
        password: 'njt862',
        database: '4D1Equipe05',
=======
const chaineConnexion = {
    client: 'mssql',
    connection: {
        host: 'sv55.cmaisonneuve.qc.ca',
        user: 'AppCRTPDev',
        password: 'Cours4D1',
        database: 'CRTPDev',
>>>>>>> dev
        options: {
            enableArithAbort: false,
        },
    },
    pool: { min: 0, max: 7 },
};
<<<<<<< HEAD
=======

// eslint-disable-next-line import/prefer-default-export
<<<<<<< HEAD
export { chaineConnexion };
>>>>>>> dev
=======
module.exports = chaineConnexion;
>>>>>>> dev
