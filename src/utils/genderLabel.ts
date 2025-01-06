export const genderLabel = (gender: undefined | number) => {
  switch (gender) {
    case 0:
      return "Man";
    case 1:
      return "Woman";
    case 2:
      return "Unisex";
    default:
      return "Unknown";
  }
};
