const checkSpecialChar = (info) => {
  return /[^a-zA-Z]/.test(info);
};

export { checkSpecialChar };
