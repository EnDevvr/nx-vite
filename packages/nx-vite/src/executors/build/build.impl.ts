import { ExecutorContext, joinPathFragments } from '@nrwl/devkit';
import { build, InlineConfig } from 'vite';
import resolveRoot from '../lib/resolveRoot';
import resolveConfigFile from '../lib/resolveRoot';
import { Options } from '../schema';

const viteBuild = async (options: Options, context: ExecutorContext) => {
  const configFile = resolveConfigFile(options.configFile, context);
  const root = resolveRoot(options.root, context);

  try {
    await build({
      root,
      configFile,
      build: {
        outDir: joinPathFragments(
          context.root,
          'dist',
          'apps',
          context.projectName
        ),
        emptyOutDir: true,
      },
    });

    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

export default viteBuild;
