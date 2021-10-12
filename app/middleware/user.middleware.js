const validate = (req, res, next) => {
    //name validation
    let nameRegex =new RegExp("^[A-Z][a-zA-Z]{2,}");
    if (!nameRegex.test(req.body.name)) {
      return res.status(400).send({
        message:
          "First letter of name must be in uppercase and should be minimum of length 3",
      });
    }

    //age validation
    if (req.body.age < 1 || req.body.age > 200) {
      return res.status(400).send({
        message: "Enter the correct age",
      });
    }

    //phone number validation
    let numberRegex = new RegExp(
        "^[0-9]{10}$"
      );
      if (!numberRegex.test(req.body.MobileNumber)) {
        return res.status(400).send({
          message: "Enter a valid phone number",
        });
      };
      next();
    };
    module.exports= validate;
    