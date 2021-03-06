import {REACT_APP, REACT_COMPONENT, WEB_APP} from '../constants'
import {UserError} from '../errors'
import getUserConfig from '../getUserConfig'
import serveReactApp from './serve-react-app'
import serveReactDemo from './serve-react-demo'
import serveWebApp from './serve-web-app'

const SERVE_COMMANDS = {
  [REACT_APP]: serveReactApp,
  [REACT_COMPONENT]: serveReactDemo,
  [WEB_APP]: serveWebApp,
}

/**
 * Generic serve command, invokes the appropriate project type-specific command.
 */
export default function serve(args, cb) {
  let userConfig = getUserConfig(args, {required: true})
  if (!SERVE_COMMANDS[userConfig.type]) {
    return cb(new UserError(`Unable to serve anything for a ${userConfig.type} project.`))
  }
  SERVE_COMMANDS[userConfig.type](args, cb)
}
