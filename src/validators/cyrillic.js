export const cyrillic = (value) => {
  return /^[A-ZА-ЯЁ\s]+$/i.test(value)
};