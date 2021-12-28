export default ({store, redirect}) => {
  if (store.getters.token && store.getters.user) {
    redirect('/');
  }
}
