/// <reference types="node" />
import 'zone.js/node';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { config as appConfig } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(App, appConfig);

export default bootstrap;
