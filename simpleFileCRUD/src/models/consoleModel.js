const fs = require('fs');

const FILE_PATH = require('../constants').FILE_PATH;

const consoleModel = {
  file: null,
  mapData: null,
  input: '',
  status: 0,
  setInput: function(input) {
    this.input = this.input + input;
  },
  clearInput: function() {
    this.input = '';
  },
  getInput: function() {
    return this.input;
  },
  setStatus: function(status) {
    this.status = status;
  },
  getStatus: function() {
    return this.status;
  },
  setFile: function() {
    if (!fs.existsSync(FILE_PATH)) {
      fs.writeFileSync(FILE_PATH, '');
    }
    this.file = fs.readFileSync(FILE_PATH, 'utf8');
    this.mapData = this.file.split('\n')
    .filter((item) => item.length !== 0)
    .map((user) => user.split('.').map((fullName) => fullName.split(' ')));
  },
  mapDataToStr: function(data) {
    return data.map((item) => item.map((fullName) => fullName.join(' ')).join('.'));
  },
  isNameValid: function(name) {
    return /^[a-zA-Z\u00C0-\u00ff]+$/.test(name);
  },
  addUser: function(user) {
    if ((user.split(' ').length !== 2 || ((user.split(' ').filter((el) => (this.isNameValid(el)))).length !== 2))) {
      return false;
    }

    try {
      this.mapData.push([[(this.mapData.length ? Number(this.mapData[this.mapData.length - 1][0]) + 1 : 0).toString()], user.split(' ')]);
      const dataToString = this.mapDataToStr(this.mapData).join('\n');

      fs.writeFileSync(FILE_PATH, dataToString);
      return true;
    } catch (err) {
      return false;
    }
  },
  findUserByFirstName: function(name) {
    if (!this.isNameValid(name)) {
      return false;
    }

    const firstNamesArr = this.mapData.filter((items) => items[1][0] === name);
    return this.mapDataToStr(firstNamesArr);
  },
  findUserByLastName: function(name) {
    if (!this.isNameValid(name)) {
      return false;
    }

    const lastNamesArr = this.mapData.filter((items) => items[1][1] === name);
    return this.mapDataToStr(lastNamesArr);
  },
  deleteUsersByFirstName: function(name) {
    if (!this.isNameValid(name)) {
      return false;
    }

    try {
      const newMapData = this.mapData.filter((user) => user[1][0] !== name);

      if (newMapData.length === this.mapData.length) {
        return 0;
      }
      const numOfDel = this.mapData.length - newMapData.length;

      this.mapData = newMapData;
      const dataToString = this.mapDataToStr(this.mapData).join('\n');
      fs.writeFileSync(FILE_PATH, dataToString);

      return numOfDel;
    } catch (err) {
      console.log(err);
      return false;
    }

  },
  deleteUsersByLastName: function(name) {
    if (!this.isNameValid(name)) {
      return false;
    }

    try {
      const newMapData = this.mapData.filter((user) => user[1][1] !== name);

      if (newMapData.length === this.mapData.length) {
        return 0;
      }
      const numOfDel = this.mapData.length - newMapData.length;

      this.mapData = newMapData;
      const dataToString = this.mapDataToStr(this.mapData).join('\n');
      fs.writeFileSync(FILE_PATH, dataToString);

      return numOfDel;
    } catch (err) {
      return false;
    }
  },
  deleteUserByFullName: function(name) {
    console.log(name);
    if ((name.split(' ').length !== 2 || ((name.split(' ').filter((el) => (this.isNameValid(el)))).length !== 2))) {
      return false;
    }

    try {
      const newMapData = this.mapData.filter((user) => user[1].join(' ') !== name);
      const numOfDel = this.mapData.length - newMapData.length;

      this.mapData = newMapData;
      const dataToString = this.mapDataToStr(this.mapData).join('\n');
      fs.writeFileSync(FILE_PATH, dataToString);

      return numOfDel;
    } catch (err) {
      return false;
    }
  },
  deleteUserById: function(id) {
    if (typeof Number(id) !== 'number') {
      return false;
    }

    try {
      const newMapData = this.mapData.filter((user) => Number(user[0]) !== Number(id));

      if (newMapData.length === this.mapData.length) {
        return 0;
      }
      const numOfDel = this.mapData.length - newMapData.length;

      this.mapData = newMapData;
      const dataToString = this.mapDataToStr(this.mapData).join('\n');
      fs.writeFileSync(FILE_PATH, dataToString);

      return numOfDel;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};

module.exports = consoleModel;
