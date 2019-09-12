const validateEmailFormat = email => {
  if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{1,})+$/.test(email)) return true;
  else return false;
};

export default validateEmailFormat;
