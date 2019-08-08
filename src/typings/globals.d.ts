type Config = {
  name: string;
};

// eslint-disable-next-line no-unused-vars
declare module NodeJS {
  interface Global {
    config: Config;
  }
}
