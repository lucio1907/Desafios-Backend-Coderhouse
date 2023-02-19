const randomNumber = (qty) => {
  let result = {};
  for (let i = 1; i <= qty; i++) {
    const randomNumber = Math.floor(Math.random() * 1000 + 1);
    if (result[randomNumber]) {
      result[randomNumber] += 1;
    } else {
      result[randomNumber] = 1;
    }
  }
  return result
}

export default randomNumber