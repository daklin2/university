const constants = {
  FILE_PATH: './users.txt',
  TEXT: {
    WELCOME_TEXT: [(
      '\n######################################\n' +
      'Welcome to users DB\n' +
      'For add user type --> ctrl + d\n' +
      'For remove user type --> ctrl + r\n' +
      'For find user type --> ctrl + f\n' +
      'For come back to Menu type --> ctrl + b\n' +
      'For exit type --> ctrl + c\n' +
      '######################################\n'
    )],
    FIND_TEXT: [(
      '\nFor find by FirstName press --> ctrl + n\n' +
      'For find by LastName press --> ctrl + l\n'
    )],
    REMOVE_TEXT: [(
      '\nFor remove by FirstName press --> ctrl + k\n' +
      'For remove by LastName press --> ctrl + j\n' +
      'For remove by FullName press --> ctrl + o\n'+
      'For remove by Index press --> ctrl + i\n'
    )]
  },
  CONSOLE_ACTIONS: {
    EXIT: '\u0003',
    ADD_USER: '\u0004',
    REMOVE_USER: {
      DEFAULT: '\u0012',
      BY_FIRST_NAME: '\u000b',
      BY_LAST_NAME: '\n',
      BY_FULL_NAME: '\u000f',
      BY_INDEX: '\t',
    },
    FIND_USER: {
      DEFAULT: '\u0006',
      BY_FIRST_NAME: '\u000e',
      BY_LAST_NAME: '\f',
    },
    ENTER_DATA: '\r',
    BACK_TO_MENU: '\u0002',
  },
  CONSOLE_STATUSES: {
    DEFAULT: 0,
    ADD_USER: 1,
    REMOVE_USER: {
      EFAULT: 2,
      BY_FIRST_NAME: 2.1,
      BY_LAST_NAME: 2.2,
      BY_FULL_NAME: 2.3,
      BY_INDEX: 2.4,
    },
    FIND_USER: {
      DEFAULT: 3,
      BY_FIRST_NAME: 3.1,
      BY_LAST_NAME: 3.2,
    },
  }
};

module.exports = constants;
