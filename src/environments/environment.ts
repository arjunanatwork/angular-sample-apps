// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  hackerNewsApiBaseUrl: 'http://node-hnapi.herokuapp.com/',
  pokedexApiBaseUrl: 'https://pokeapi.co/api/v2/',
  bhagavadGitaEndpoints: {
    token: 'https://bhagavadgita.io/auth/oauth/token',
    api: 'https://bhagavadgita.io/api/v1/'
  },
  firebase: {
    apiKey: 'AIzaSyDcMC0Nuz32qF3x6Ji3pt8Oq5CQBIBD4vw',
    authDomain: 'angular-mini-apps.firebaseapp.com',
    databaseURL: 'https://angular-mini-apps.firebaseio.com',
    projectId: 'angular-mini-apps',
    storageBucket: 'angular-mini-apps.appspot.com',
    messagingSenderId: '277563647174'
  }
};
