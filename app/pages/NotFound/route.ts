export default (store) => ({
  path: '404',
  getComponent: (location, cb) => {
    System.import('pages/NotFound').then((NotFound) => {
      cb(null, NotFound.default)
    })
  },
})
