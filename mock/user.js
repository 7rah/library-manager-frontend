
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  },
  'admin@admin.com': {
    token: 'admin-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/books-manager/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens['admin']
/*
      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }
*/
      return {
        code: 20000,
        data: token
      }
    }
  },

  // user register
  {
    url: '/books-manager/user/register',
    type: 'post',
    response: config => {
      return {
        code: 60205,
        message: 'register error'
      }
    }
  },

  // get user info
  {
    url: '/books-manager/user/info\.*',
    type: 'get',
    response: config => {
      // const { token } = 'admin-token'
      const info = users['admin-token']

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/books-manager/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
