import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticationCheck = async(req, res, next) => {
  let token;

  if(
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ){
    try{
      // 헤더에서 토큰 불러옴
      token = req.headers.authorization.split(' ')[1]

      // 토큰 verify
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 토큰에서 유저 정보를 가져옴
      req.user = await User.findById(decoded.id).select('-password');

      next();
    }catch(err){
      return res.status(400).json({message: 'Not authorized'});
    }
  }

  if(!token){
    return res.status(400).json({message: 'Cannot find Token'});
  }
}