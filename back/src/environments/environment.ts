// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  authApiUrl: 'http://localhost:4300',
  pizzaApiUrl: 'http://localhost:4301/',
  orderUrl: 'http://localhost:4302',
  deliveryUrl: 'http://localhost:4304',
};
