export function login (state, data) {
  state.jwt.token = data.token
  state.jwt.received = new Date().getTime()
  state.user.account = data.account
  state.user.role = data.role
  state.user.email = data.email
}

export function logout (state) {
  state.jwt = {
    token: '',
    received: 0
  }
  state.user = {
    account: '',
    role: 0,
    email: ''
  }
}

export function extend (state, data) {
  state.jwt.token = data
  state.jwt.received = new Date().getTime()
}

export function getinfo (state, data) {
  state.user.account = data.account
  state.user.role = data.role
  state.user.email = data.email
}
