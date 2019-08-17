type Config = {
  name: string;
};

// eslint-disable-next-line no-unused-vars
declare namespace NodeJS {
  interface Global {
    config: Config;
  }
}
