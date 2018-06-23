import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
//bootstrapModule says what file sould run first
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
