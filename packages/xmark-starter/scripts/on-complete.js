const shell = require('shelljs');
const chalk = require('chalk');

process.on('unhandledRejection', err => {
  throw err;
});

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
  shell.echo(`1. Start App: ${chalk.cyan(`cd ${process.env.FORGE_BLOCKLET_TARGET_DIR} && ${pm} start`)}`);
  shell.echo('2. Preview: open http://127.0.0.1:8000');
  shell.echo('');
};

onComplete();
