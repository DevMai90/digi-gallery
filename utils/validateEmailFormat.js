module.exports = email => {
  // if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return true;
  if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{1,})+$/.test(email)) return true;
  else return false;
};
