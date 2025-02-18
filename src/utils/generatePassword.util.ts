const generatePassword = (teamID:number) => {
  let password = String(teamID);
  const alphaCode = "kamlesh1233@tyuipew@erkwerjnfsdfsflezxcm@";
  while (password.length < 10) {
    const pos = Math.floor(Math.random() * alphaCode.length);
    password += alphaCode.at(pos);
  }

  return  password;
};

export default generatePassword;
