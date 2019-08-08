'use strict';

// eslint-disable-next-line no-unused-vars
import * as path from 'path';
// eslint-disable-next-line no-unused-vars
import {Request, Response, NextFunction} from 'express';
import {debug} from 'debug';
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as createError from 'http-errors';
import {Router} from 'express';

// eslint-disable-next-line new-cap
const router = Router();
const app = express();

/* logger */
const serverDebugger = debug('express:server');
const appDebugger = debug('express:app');

appDebugger('アプリケーションレベルのミドルウェア設定');

global.config = {
  name: 'fuwapath',
};

/* view ディレクトリの設定*/
const viewsDir = path.join(__dirname, '../src/views');
app.set('views', viewsDir);
app.set('view engine', 'pug');

app.set('case sensitive routing', true);

/* static ディレクトリの設定 */
const staticDir = path.join(__dirname, '../public');
app.use(express.static(staticDir));

/* 外部ミドルウェアの設定 */
app.use(morgan('dev'));
app.use(helmet());

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render('home', {title: 'Home'});
});

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

app.listen(8000, (req: Request, res: Response, next: NextFunction) => {
  serverDebugger('サーバーを起動しました');
  const {version, platform} = global.process;
  const {config} = global;
  serverDebugger(`node version: ${version}\nplatform: ${platform}`);
  serverDebugger(config);
});

process.on('SIGINT', () => {
  serverDebugger('\nサーバーを終了しました');
  process.exit(0);
});
