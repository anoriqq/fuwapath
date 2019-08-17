import * as cluster from 'cluster';
import {cpus} from 'os';
import {debug} from 'debug';
import {run} from './console';

const numCPUs = cpus().length;
/* logger */
const workerLog = debug('worker');

if (cluster.isMaster) {
  /* マスタープロセス */
  workerLog(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) cluster.fork();
  cluster.on('exit', (worker, code, signal) => {
    workerLog(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
  cluster.on('fork', worker => {
    workerLog(`Worker ${worker.process.pid} started`);
  });
} else {
  /* ワーカープロセス */
  run();
}
