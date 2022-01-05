import { ExecutorContext, joinPathFragments } from '@nrwl/devkit';

const resolveConfigFile = (
  configFilePath: string,
  context: ExecutorContext
) => {
  const projectDir = context.workspace.projects[context.projectName].root;
  const projectRoot = joinPathFragments(`${context.root}/${projectDir}`);

  const configFile = joinPathFragments(projectRoot, configFilePath);

  return configFile;
};

export default resolveConfigFile;
