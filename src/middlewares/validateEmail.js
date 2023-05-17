const validateEmail = (req, res, next) => {
  const email = req.body.email;

  const regex = /\S+@\S+\.\S+/;

  if (!email) {
    return res.status(400).json({
      message: 'O campo \"email\" é obrigatório',
    });
  }
  if (!regex.test(email)) {
    return res.status(400).json({
      message: 'O \"email\" deve ter o formato \"email@email.com\"',  
    });
  }
  next();
}

module.exports = validateEmail;