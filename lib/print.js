const logger = require(`../util/logger`);

module.exports = function print(obj) {
  const properties = Object.keys(obj);
  properties.forEach(p => {
    const name = p.toString();
    const value = obj[p];
    logger.log(`${name} : ${value}`);
  });
};
