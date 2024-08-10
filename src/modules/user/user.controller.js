import  jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../../../models/user.model.js";

const signUp = async (req, res) => {
  const { name, email, password, age } = req.body;
  const user = await userModel.findOne({ email });
  if (user) return res.json({ message: "user already exists" });
    let hash = bcrypt.hashSync(password, 8);
    await userModel.insertMany({ name, email, password: hash , age });
    res.json({ message: "success" });
  
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  //   if(user){
  //     // & Check password
  //     let match = bcrypt.compareSync(password, user.password); // true
  //     if(match){
  //       res.json({ message: "login with token"})
  //     }else{
  //       res.json({ message: "incorrect password" })
  //     }

  //   }else{
  //     res.json({ message: "user not found" })
  //   }

  //  }

  if (user && bcrypt.compareSync(password, user.password)) {
    let token = jwt.sign({
      name: user.name,
      userId: user._Id
    }, 'mynameisoussema')

    res.json({ message: "login with token",token});
  } else {
    res.json({ message: "user not found or incorrect password" });
  }
};

export { signUp, signIn };

