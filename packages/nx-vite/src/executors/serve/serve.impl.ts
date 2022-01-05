import { ExecutorContext } from '@nrwl/devkit';
import { createServer, InlineConfig } from 'vite';
import { RollupWatcherEvent } from 'rollup';
import resolveConfigFile from '../lib/resolveRoot';
import { Options } from '../schema';
import resolveRoot from '../lib/resolveRoot';

const colors = {
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
};

const viteServe = async (options: Options, context: ExecutorContext) => {
  const configFile = resolveConfigFile(options.configFile, context);
  const root = resolveRoot(options.root, context);

  const serverFactory = await createServer({
    root,
    configFile,
  });

  const devServer = await serverFactory.listen();

  console.log(
    `${colors.green}Nx-Vite${colors.reset} [${colors.cyan}Start${colors.reset}]`
  );

  devServer.printUrls();

  try {
    await new Promise<void>((resolve, reject) => {
      devServer.watcher.on('event', (event: RollupWatcherEvent) => {
        console.log(event);
        event.code === 'ERROR' ? reject() : resolve();
      });
    });

    await devServer.close();

    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

export default viteServe;
