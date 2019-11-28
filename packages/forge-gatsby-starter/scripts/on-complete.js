const shell = require('shelljs');
const chalk = require('chalk');

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
  shell.echo('Run script to start:');
  shell.echo(`1. Start server: ${chalk.cyan(`cd ${process.env.FORGE_BLOCKLET_TARGET_DIR} && ${pm} start:server`)}`);
  shell.echo(`2. Start client in another terminal: ${chalk.cyan(`${pm} start:gatsby`)}`);
  shell.echo('');
};

onComplete();
