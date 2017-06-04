import { matchWhenNotAuthed } from "routes";

export default (store) => ({
  path: 'confirm_email',
  getComponent:(location, cb) => {
    System.import('pages/ConfirmEmailPage').then((ConfirmEmailPage) => {
      cb(null, ConfirmEmailPage.default)
    })
  },
  onEnter: matchWhenNotAuthed
})

