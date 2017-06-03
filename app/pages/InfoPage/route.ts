import { matchWhenNotAuthed } from "routes";

export default (store) => ({
  path: 'info_page',
  getComponent:(location, cb) => {
    System.import('pages/InfoPage').then((InfoPage) => {
      cb(null, InfoPage.default)
    })
  },
  onEnter: matchWhenNotAuthed
})

