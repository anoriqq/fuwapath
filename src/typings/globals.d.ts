type Config = {
  /* 基本情報 */
  NAME: string;
  VERSION: string;
  MODE: string;

  /* サーバー起動情報 */
  SERVER: {
    CONSOLE: {
      PORT: number;
    };
    TRACK: {
      PORT: number;
    };
  };

  /* ロール */
  ROLES: string[];
};

// eslint-disable-next-line no-unused-vars
declare namespace NodeJS {
  interface Global {
    config: Config;
  }
}
