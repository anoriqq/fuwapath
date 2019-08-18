import * as cluster from 'cluster';
import {cpus} from 'os';
import {debug} from 'debug';
import {run} from './console';

if (cluster.isMaster) {
  /* マスタープロセス */

  /* logger */
  const workerLog = debug('worker');

  workerLog(`Master ${process.pid} is running`);

  const numCPUs = cpus().length;
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
