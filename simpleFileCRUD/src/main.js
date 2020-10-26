const stdin = process.stdin;

const consoleModel = require('./models/consoleModel');
const CONSOLE_COMMANDS = require('./constants').CONSOLE_ACTIONS;
const CONSOLE_STATUSES = require('./constants').CONSOLE_STATUSES;
const CONSOLE_TEXT = require('./constants').TEXT;

consoleModel.setFile();

const statusDefinition = (status, data) => {
  let users = null;
  let response = null;

  switch (status) {
    case CONSOLE_STATUSES.ADD_USER:
      if (consoleModel.addUser(data)) {
        process.stdout.write('\nSuccessful added.\n');
        process.stdout.write('\nBacked to main menu.\n');
        return true;
      } else {
        process.stdout.write(`\nWrong Input. Try again.\n`);
        return false;
      }
    case CONSOLE_STATUSES.REMOVE_USER.BY_FIRST_NAME:
      response = consoleModel.deleteUsersByFirstName(data);
      if (response || response === 0) {
        process.stdout.write(`\n\nSuccessful deleted ${response} users with this FirstName.\n`);
        process.stdout.write('\nBacked to main menu.\n');
        return true;
      } else {
        process.stdout.write(`\nWrong Input. Try again.\n`);
        return false;
      }
    case CONSOLE_STATUSES.REMOVE_USER.BY_LAST_NAME:
      response = consoleModel.deleteUsersByLastName(data);
      if (response || response === 0) {
        process.stdout.write(`\n\nSuccessful deleted ${response} users with this LastName.\n`);
        process.stdout.write('\nBacked to main menu.\n');
        return true;
      } else {
        process.stdout.write(`\nWrong Input. Try again.\n`);
        return false;
      }
    case CONSOLE_STATUSES.REMOVE_USER.BY_FULL_NAME:
      response = consoleModel.deleteUserByFullName(data);
      if (response || response === 0) {
        process.stdout.write(`\n\nSuccessful deleted ${response} users with this FullName.\n`);
        process.stdout.write('\nBacked to main menu.\n');
        return true;
      } else {
        process.stdout.write(`\nWrong Input. Try again.\n`);
        return false;
      }
    case CONSOLE_STATUSES.REMOVE_USER.BY_INDEX:
      response = consoleModel.deleteUserById(data);
      if (response || response === 0) {
        process.stdout.write(`\n\nSuccessful deleted ${response} users with this FirstName.\n`);
        process.stdout.write('\nBacked to main menu.\n');
        return true;
      } else {
        process.stdout.write(`\nWrong Input. Try again.\n`);
        return false;
      }
    case CONSOLE_STATUSES.FIND_USER.BY_FIRST_NAME:
      users = consoleModel.findUserByFirstName(data);
      if (users) {
        process.stdout.write(`\n\nSuccessful find ${users.length} users with this FirstName.\n`);
        process.stdout.write(`${users.join('\n')}\n`);
        process.stdout.write('\nBacked to main menu.\n');
        return true;
      } else {
        process.stdout.write(`\nWrong Input. Try again.\n`);
        return false;
      }
    case CONSOLE_STATUSES.FIND_USER.BY_LAST_NAME:
      users = consoleModel.findUserByLastName(data);
      if (users) {
        process.stdout.write(`\n\nSuccessful find ${users.length} users with this LastName.\n`);
        process.stdout.write(`${users.join('\n')}\n`);
        process.stdout.write('\nBacked to main menu.\n');
        return true;
      } else {
        process.stdout.write(`\nWrong Input. Try again.\n`);
        return false;
      }
    default:
      return;
  }
};

stdin.on('keypress', (key) => {
  const isCanPrint = (status) => {
    if (status === CONSOLE_STATUSES.ADD_USER) {
      return true;
    }
    if ((status === CONSOLE_STATUSES.FIND_USER.BY_LAST_NAME) || (status === CONSOLE_STATUSES.FIND_USER.BY_FIRST_NAME)) {
      return true;
    }
    if (
      (status === CONSOLE_STATUSES.REMOVE_USER.BY_LAST_NAME) ||
      (status === CONSOLE_STATUSES.REMOVE_USER.BY_FIRST_NAME) ||
      (status === CONSOLE_STATUSES.REMOVE_USER.BY_FULL_NAME) ||
      (status === CONSOLE_STATUSES.REMOVE_USER.BY_INDEX)
    ) {
      return true;
    }
    return false;
  };

  switch (key) {
    case CONSOLE_COMMANDS.ADD_USER:
      if (consoleModel.getStatus() === CONSOLE_STATUSES.DEFAULT) {
        process.stdout.write('\nWrite {FistName LastName} and press ENTER\n');
        consoleModel.setStatus(CONSOLE_STATUSES.ADD_USER);
      }
      break;
    case CONSOLE_COMMANDS.REMOVE_USER.DEFAULT:
      if (consoleModel.getStatus() === CONSOLE_STATUSES.DEFAULT) {
        process.stdout.write(CONSOLE_TEXT.REMOVE_TEXT[0]);
        consoleModel.setStatus(CONSOLE_STATUSES.REMOVE_USER.DEFAULT);
      }
      break;
    case CONSOLE_COMMANDS.REMOVE_USER.BY_FIRST_NAME:
      if (consoleModel.getStatus() === CONSOLE_STATUSES.REMOVE_USER.DEFAULT) {
        process.stdout.write('\nWrite {FirstName} and press ENTER\n');
        consoleModel.setStatus(CONSOLE_STATUSES.REMOVE_USER.BY_FIRST_NAME);
      }
      break;
    case CONSOLE_COMMANDS.REMOVE_USER.BY_LAST_NAME:
      if (consoleModel.getStatus() === CONSOLE_STATUSES.REMOVE_USER.DEFAULT) {
        process.stdout.write('\nWrite {LastName} and press ENTER\n');
        consoleModel.setStatus(CONSOLE_STATUSES.REMOVE_USER.BY_LAST_NAME);
      }
      break;
    case CONSOLE_COMMANDS.REMOVE_USER.BY_FULL_NAME:
      if (consoleModel.getStatus() === CONSOLE_STATUSES.REMOVE_USER.DEFAULT) {
        process.stdout.write('\nWrite {FistName LastName} and press ENTER\n');
        consoleModel.setStatus(CONSOLE_STATUSES.REMOVE_USER.BY_FULL_NAME);
      }
      break;
    case CONSOLE_COMMANDS.REMOVE_USER.BY_INDEX:
      if (consoleModel.getStatus() === CONSOLE_STATUSES.REMOVE_USER.DEFAULT) {
        process.stdout.write('\nWrite {Index} and press ENTER\n');
        consoleModel.setStatus(CONSOLE_STATUSES.REMOVE_USER.BY_INDEX);
      }
      break;
    case CONSOLE_COMMANDS.FIND_USER.DEFAULT:
      if (consoleModel.getStatus() === CONSOLE_STATUSES.DEFAULT) {
        process.stdout.write(CONSOLE_TEXT.FIND_TEXT[0]);
        consoleModel.setStatus(CONSOLE_STATUSES.FIND_USER.DEFAULT);
      }
      break;
    case CONSOLE_COMMANDS.FIND_USER.BY_FIRST_NAME:
      if (consoleModel.getStatus() === CONSOLE_STATUSES.FIND_USER.DEFAULT) {
        process.stdout.write('\nWrite {FirstName} and press ENTER\n');
        consoleModel.setStatus(CONSOLE_STATUSES.FIND_USER.BY_FIRST_NAME);
      }
      break;
    case CONSOLE_COMMANDS.FIND_USER.BY_LAST_NAME:
      if (consoleModel.getStatus() === CONSOLE_STATUSES.FIND_USER.DEFAULT) {
        process.stdout.write('\nWrite {LastName} and press ENTER\n');
        consoleModel.setStatus(CONSOLE_STATUSES.FIND_USER.BY_LAST_NAME);
      }
      break;
    case CONSOLE_COMMANDS.ENTER_DATA:
      const response = statusDefinition(consoleModel.getStatus(), consoleModel.getInput());
      if (response) {
        consoleModel.setStatus(0);
        consoleModel.clearInput();
      } else {
        consoleModel.clearInput();
      }
      break;
    case CONSOLE_COMMANDS.BACK_TO_MENU:
      consoleModel.setStatus(0);
      consoleModel.clearInput();
      process.stdout.write(CONSOLE_TEXT.WELCOME_TEXT[0]);
      break;
    case CONSOLE_COMMANDS.EXIT:
      process.exit();
      break;
    default:
      if (isCanPrint(consoleModel.getStatus())) {
        consoleModel.setInput(key);
        process.stdout.write(key);
      }
      return;
  }
});
