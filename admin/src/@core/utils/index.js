var isDebug = process.env.NODE_ENV === "development";
console.log("This is a", isDebug ? "development" : "production", "mode");

module.exports = {
  isDebug,
};
