const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUMrK1VxNFNTbnlUc3JIUEZqME9IY2lVai8xS05mLzVqM1RMaXBCbUNWZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicmdST204TzNESkFWTml0dWMwdHVoQmRrQmdobDlkVUxMUGJhTUtqSzNDOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5THFwd1hRSmpvbFZtelMvTXA1Ym03WHlKSU55bzA1VWdLTFY3U0R5RlZVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJiN0xMUTZESWVqWmd2TnNZejlxZHloS1A0U0hwRGZ2cEZaTHA5bURyRWdzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNQaFI5UFd2akVYems5eS9KREJvNFFyWEpZLzBld3dWYXhibEFmMVlpbTQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikk5bTJ4UUkybFFycjM0b0svVkt4eFE2RGZ6M1R3UEhDbFdmelNCMEtDelk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK1BtMlUwUTA2N3IySXJtZWhuZ0dPQ0R3R0l2U3hmQWVUNnBYYU5ycHVsaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid2VLWFpqZ2tWMVVrWGY1ZUErbkhSUW1JVXNoVE53em9BWldwd1NzeHVFdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldrM3MzZCtsTjluNkFoZlgvT2lnbEpOWEVyZEJ5cHNXU3R2NDFURERTQjN5Mkx1RG5RUUZSeDRpQ0xycTRqVXE2ZWd3bmtWYnlQWjlvRkVNSExiN2dnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM5LCJhZHZTZWNyZXRLZXkiOiJVK2swWU5FZFVrTVlIM01SaWU0OThJRHB3Y1lzRUh6eXJ0UmU2WUc1eUI0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzMsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMywiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiIxMjNMT1RVUyIsIm1lIjp7ImlkIjoiMjU0NzA4Njk5NDk4OjMwQHMud2hhdHNhcHAubmV0IiwibGlkIjoiNDk2OTczMzUwMzM4NjY6MzBAbGlkIiwibmFtZSI6IkxleWxhaCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTlBMNzZrQkVNWEt3TUVHR0IwZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoieEZZYVF2bXljeDVoOTZQYUhtS1NncXRFbXlialRVeFc0aXpXdnJyUVludz0iLCJhY2NvdW50U2lnbmF0dXJlIjoibDdTdDRaYjZ6ZGU3QXBFWjlaL0liMUFXSGZaWHhkQ1NSWWpWVGpWaHI1eHlIL09uUHhUWWR5NllLRjFKcy9heXRDRTRlMm9ObnFJb2N4c2lUU2luQXc9PSIsImRldmljZVNpZ25hdHVyZSI6ImdsYmdodTI3cHZnbW84UU52RCt1ZitBV1ZYdUNsdVFGeHFwM1NPa3ZwbTF6REJad285dnd4WFJ0dEV6NjFHeHM4YnJGa0d6THRISlEvV2dEKzg2a2hBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzA4Njk5NDk4OjMwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmNSV0drTDVzbk1lWWZlajJoNWlrb0tyUkpzbTQwMU1WdUlzMXI2NjBHSjgifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBMElCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0Nzk4NTc0NywibGFzdFByb3BIYXNoIjoiUFdrNUIifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "DML",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254708699498",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'DML-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

