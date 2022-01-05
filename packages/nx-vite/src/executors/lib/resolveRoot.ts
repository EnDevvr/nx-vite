import { ExecutorContext, joinPathFragments } from '@nrwl/devkit';

const resolveRoot = (rootFilePath: string, context: ExecutorContext) => {
  const projectDir = context.workspace.projects[context.projectName].root;
  const projectRoot = joinPathFragments(`${context.root}/${projectDir}`);

  const root = joinPathFragments(projectRoot, rootFilePath);

  return root;
};

export default resolveRoot;
