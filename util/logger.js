const chalk = require(`chalk`);

const prefix = `[qiniu-upload-tool]`;

module.exports.log = (msg, color) => {
  const newcolor = color || `cyan`;
  console.log(chalk.cyan(prefix), chalk[newcolor](msg));
};

module.exports.success = (msg) => {
  console.log(chalk.cyan(prefix), chalk.green(`[success] `), chalk.green(msg));
};

module.exports.error = (err) => {
  console.log(chalk.cyan(prefix), chalk.red(`[error] `), chalk.red(err));
};
