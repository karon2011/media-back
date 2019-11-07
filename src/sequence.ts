import { inject } from '@loopback/context';
import {
  FindRoute,
  InvokeMethod,
  ParseParams,
  Reject,
  RequestContext,
  RestBindings,
  Send,
  SequenceHandler,
} from '@loopback/rest';

const SequenceActions = RestBindings.SequenceActions;

export class MySequence implements SequenceHandler {
  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,
  ) { }

  /**
 * Runs the default sequence. Given a handler context (request and response),
 * running the sequence will produce a response or an error.
 *
 * Default sequence executes these steps
 *  - Finds the appropriate controller method, swagger spec
 *    and args for invocation
 *  - Parses HTTP request to get API argument list
 *  - Invokes the API which is defined in the Application Controller
 *  - Writes the result from API into the HTTP response
 *  - Error is caught and logged using 'logError' if any of the above steps
 *    in the sequence fails with an error.
 *
 * @param context The request context: HTTP request and response objects,
 * per-request IoC container and more.
 */
  async handle(context: RequestContext) {
    try {
      const { request, response } = context;
      const route = this.findRoute(request);
      const args = await this.parseParams(request, route);
      const result = await this.invoke(route, args);
      this.send(response, result);
    } catch (err) {
      this.reject(context, err);
    }
  }
}
