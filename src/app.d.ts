// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Logger } from 'pino';

// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            logger: Logger;
        }
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export {};
