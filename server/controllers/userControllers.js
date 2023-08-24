import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// token 생성
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '12hr' // 12시간 후  자동 소멸
  });
}

// @desc   Register
// @route  POST  /api/users/register
// @access Public
export const register = async(req, res) => {
  try{
    const {name, email, password} = req.body;

    // 이미 해당 이메일로 가입한 적 있는 지 확인
    const existUserCheck = await User.findOne({email});
    if(existUserCheck){
      return res.status(400).json({message: 'User is already exist.'});
    }
    
    // 비밀번호 암호화
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    // DB에 유저 정보 저장
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })
  
    // FE에는 암호를 제외하고 전송
    if(user){
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      })
    }
  }catch(err){
    res.status(400).json({message: 'Fail to register'});
  }
}


// @desc   Login
// @route  POST  /api/users/login`
// @access Public
export const login = async(req, res) => {
  try{
    const {email, password} = req.body;

    // 해당 이메일로 가입한 유저가 있는지 확인
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message: 'Cannot find email.'})

    // 비밀번호 일치하는지 확인 - 해시화한 암호로 확인
    const comparePwd = await bcrypt.compare(password, user.password);
    if(!comparePwd) return res.status(400).json({message: 'Password does not match.'})

    // 둘 다 있으면 FE에는 아이디, 이메일, 토큰 보내기
    // 이때 토큰은 generateToken 
    if(user && await bcrypt.compare(password, user.password)){
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token : generateToken(user._id)
      })
    }else{
      return res.status(400).json({message: 'Cannot find user'})
    }
  }catch(err){
    res.status(400).json({message: 'Fail to login'})
  }
}

export const getMyInfo = async(req, res) => {
  return res.status(200).json(req.user);
}