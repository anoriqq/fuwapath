'use strict';

import * as config from 'config';
// eslint-disable-next-line no-unused-vars
import * as path from 'path';
// eslint-disable-next-line no-unused-vars
import {Request, Response, NextFunction} from 'express';
import {debug} from 'debug';
import * as express from 'express';
const Router = express.Router;
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as createError from 'http-errors';

/**
 * console サーバーを起動する
 * ワーカーから実行される
 * @return {void}
 */
export function run(): void {
  /** プロセス起動時の引数 */
  // const args = process.argv.slice(2);

  // eslint-disable-next-line new-cap
  const router = Router();
  const app = express();

  /* logger */
  const serverLog = debug('express:server');
  const routerLog = debug('express:router');
  // const appLog = debug('express:app');

  // appLog('アプリケーションレベルのミドルウェア設定');

  global.config = config.get('CONFIG');

  /* view ディレクトリの設定*/
  const viewsDir = path.join(__dirname, '../src/views');
  app.set('views', viewsDir);
  app.set('view engine', 'pug');

  app.set('case sensitive routing', true);
  app.set('port', global.config.SERVER.CONSOLE.PORT);

  /* static ディレクトリの設定 */
  const staticDir = path.join(__dirname, '../public');
  app.use(express.static(staticDir));

  /* 外部ミドルウェアの設定 */
  app.use(morgan('dev'));
  app.use(helmet());

  router.get('/', (req: Request, res: Response, next: NextFunction) => {
    routerLog(process.pid);
    res.render('home', {title: 'Home', pid: process.pid});
  });

  app.use('/', router);

  /* 404ハンドラー */
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404));
  });

  /* エラーハンドラー */
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error', {title: 'Sorry', err});
  });

  const port = app.get('port');
  app.listen(port, (req: Request, res: Response, next: NextFunction) => {
    const {version, platform} = global.process;
    serverLog('サーバーを起動しました');
    serverLog(`Node version: ${version}\nPlatform: ${platform}\nPort: ${port}`);
  });

  process.on('SIGINT', () => {
    serverLog('サーバーを終了しました');
    process.exit(0);
  });
}
