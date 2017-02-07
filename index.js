#!/usr/bin/env node

const fs = require('fs');

const mvinst = {};
const files = fs.readdirSync(process.cwd());

files.forEach(file => {
  const stat = fs.statSync(file);
  if(!stat.isFile()) {
    return;
  }
  const birth = new Date(stat.birthtime);
  const year = `${birth.getFullYear()}`;
  const month = `0${birth.getMonth() + 1}`.slice(-2);
  const date = `0${birth.getDate()}`.slice(-2);

  if(!fs.existsSync(year)) {
    fs.mkdirSync(year);
  }

  if(!fs.existsSync(`${year}/${month}`)) {
    fs.mkdirSync(`${year}/${month}`);
  }

  if(!fs.existsSync(`${year}/${month}/${date}`)) {
    fs.mkdirSync(`${year}/${month}/${date}`);
  }

  console.log(`${file} ${year}/${month}/${date}/`)
});
