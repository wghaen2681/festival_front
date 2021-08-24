export function user (state) {
  return { islogin: state.user.account.length > 0, isAdmin: state.user.role === 1, ...state.user }
}
