'use strict';

const pg = require('pg');
const fsp = require('node:fs/promises');
const path = require('node:path');

const POSTGRES = {
  host: '127.0.0.1',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'mysecretpassword',
};

const APPLICATION = {
  host: '127.0.0.1',
  port: 5432,
  database: 'application',
  user: 'leonid',
  password: 'leonid',
};

const DB = path.join(process.cwd(), './src/application/db');

const read = (name) => fsp.readFile(path.join(DB, name), 'utf8');

const execute = async (client, sql) => {
  try {
    await client.query(sql);
  } catch (err) {
    const { message, detail } = err;
    console.error(`${sql}\n${message}\n${detail}\n`);
  }
};

const notEmpty = (s) => s.trim() !== '';

const executeFile = async (client, name) => {
  console.log(`Execute file: ${name}`);
  const sql = await read(name);
  const commands = sql.split(';\n').filter(notEmpty);
  for (const command of commands) {
    await execute(client, command);
  }
};

(async () => {
  const installationClient = new pg.Client(POSTGRES);
  await installationClient.connect();
  await executeFile(installationClient, 'install.sql');
  await installationClient.end();
  const applicationClient = new pg.Client(APPLICATION);
  await applicationClient.connect();
  await executeFile(applicationClient, 'structure.sql');
  await applicationClient.end();
})();
