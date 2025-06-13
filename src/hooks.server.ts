import { PinoPretty, type PrettyStream } from 'pino-pretty';
import { pino } from 'pino';
import { AssertionError } from 'assert';

// keep pretty transport always
const stream: PrettyStream = PinoPretty();
const logger = pino(stream);

logger.info('system started');

export async function handle({ event, resolve }) {
    const { locals, request } = event;

    locals.logger = logger.child({
        requestId: crypto.randomUUID(),
        method: request.method,
        url: request.url,
    });

    locals.logger.info('request initiated');

    const start = performance.now();
    try {
        const response = await resolve(event);
        locals.logger.info({
            status: response.status,
            response_time: performance.now() - start,
        });
        return response;
    } catch (error) {
        locals.logger.error({ error, response_time: performance.now() - start });
        throw error;
    }
}

export function handleError({ error, event: { locals } }) {
    if (error instanceof AssertionError) {
        const assertionError = error as AssertionError;
        locals.logger.fatal({ nodeAssertionError: assertionError }, assertionError.message);
    } else if (error instanceof Error) {
        const err = error as Error;
        locals.logger.fatal({ error: err }, err.message);
    } else {
        locals.logger.fatal({ unknownError: error });
    }
}
