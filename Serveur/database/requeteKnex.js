const path = require("path");

const knex = require("knex")({
    client: "mssql",
    connection: {
        host: "sv55.cmaisonneuve.qc.ca",
        user : '4D1EQUIPE06',
        password : 'pwn852',
        database : '4D1Equipe06'
      },
    useNullAsDefault: false
});

function getPersonne() {
    return knex("Personnes");
}

function getUtilisateurs() {
    return knex("Utilisateurs");
}

function getConditions() {
    return knex("Conditions");
}

function getFPS() {
    return knex("FPS");
}

function getIBAF() {
    return knex("IBAF");
}

function getIBOB() {
    return knex("IBOB");
}

function getIBVA() {
    return knex("IBVA");
}

function getIPPE() {
    return knex("IPPE");
}

module.exports = {
    getPersonne,
    getUtilisateurs,
    getConditions,
    getFPS,
    getIBAF,
    getIBOB,
    getIBVA,
    getIPPE,
}