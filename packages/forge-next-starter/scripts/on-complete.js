const chalk = require('chalk');
const shell = require('shelljs');

/**
 * On project ready to run
 * You can print basic steps for users to start the application
 *
 * @function
 * @public
 */
const onComplete = () => {
  const pm = shell.which('yarn') ? 'yarn' : 'npm';
  shell.echo('');
  shell.echo(chalk.cyan(`cd ${process.env.FORGE_BLOCKLET_TARGET_DIR} && ${pm} start`));
  shell.echo('');
};

onComplete();
