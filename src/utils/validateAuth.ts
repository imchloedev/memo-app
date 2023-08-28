const emailRegEx =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;
const birthDateRegEx = /^[0-9]{4}\/[0-9]{2}\/[0-9]{2}$/;

export const validateEmail = (email: string) => {
  return email.length > 0 && emailRegEx.test(email);
};

export const validatePassword = (password: string) => {
  return password.length > 0 && passwordRegEx.test(password);
};

export const validateBirthDate = (date: string) => {
  return date.length > 0 && birthDateRegEx.test(date);
};
