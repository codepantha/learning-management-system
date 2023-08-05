const bcrypt = require('bcryptjs');

const hash_password = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports = { hash_password };
