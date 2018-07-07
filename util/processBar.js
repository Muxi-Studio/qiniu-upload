const ProgressBar = require("progress");

module.exports = function showBar(len) {
  const bar = new ProgressBar(
    "[qiniu-upload-tool] uploading [:bar] :rate/bps :percent :etas",
    {
      complete: "█",
      incomplete: "░",
      width: 20,
      total: len
    }
  );

  return bar;
};
