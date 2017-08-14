#!/usr/bin/env node

const fs = require('fs');
const ExifImage = require('exif').ExifImage;
const [, , flag] = process.argv;

async function getTimestamp(file) {
  let timestamp;
  try {
    timestamp = await getStatTimestamp(file);
    return await getExifTimestamp(file);
  } catch (exception) {
    if(exception.isNotFile) {
      return Promise.reject(exception);
    }
    console.error(exception);
    return Promise.resolve(timestamp);
  }
}

async function getExifTimestamp(file) {
  return new Promise((resolve, reject) => {
    try {
      new ExifImage({ image : file }, function (error, exifData) {
        if (error)
          reject(error);
        else {
          try {
            const [, year, month, date] = /^(\d{4}):(\d{2}):(\d{2})/.exec(exifData.exif.DateTimeOriginal);
            resolve({year, month, date});
          } catch(err) {
            reject(err);
          }
        }
      });
    } catch (error) {
      reject(error);
    }
  })
}

async function getStatTimestamp(file) {
  const stat = fs.statSync(file);
  if(!stat.isFile()) {
    return Promise.reject({
      isNotFile: true,
      error: `${file} is not file`
    });
  }
  
  const birth = new Date(stat.birthtime);
  const year = `${birth.getFullYear()}`;
  const month = `0${birth.getMonth() + 1}`.slice(-2);
  const date = `0${birth.getDate()}`.slice(-2);
  
  return Promise.resolve({
    year,
    month,
    date
  });
}

(async function run() {
  const files = fs.readdirSync(process.cwd());
  
  files.forEach(async (file) => {
    let year, month, date;
    try {
      const timestamp = await getTimestamp(file);
      year = timestamp.year;
      month = timestamp.month;
      date = timestamp.date;
    } catch (nofile) {
      return;
    }
    
    if(flag !== '--execute') {
      console.log(`"${file}" "${year}/${month}/${date}/"`);
      return;
    }
    
    if(!fs.existsSync(year)) {
      fs.mkdirSync(year);
    }
    
    if(!fs.existsSync(`${year}/${month}`)) {
      fs.mkdirSync(`${year}/${month}`);
    }
    
    if(!fs.existsSync(`${year}/${month}/${date}`)) {
      fs.mkdirSync(`${year}/${month}/${date}`);
    }
    
    fs.renameSync(file, `${year}/${month}/${date}/${file}`)
  });
})();
