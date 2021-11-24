module.exports = (mimetype) => {
  const [fileMimeType] = mimetype.split("/");
  if (fileMimeType === "image") return true;
};
