import Goal from "../models/Goal.js";
import User from "../models/User.js";

// @desc   Get goals
// @route  GET /api/goals
// @access Private
export const getGoals = async(req, res) => {
  try{
    const goals = await Goal.find({user: req.user._id});
    res.status(200).json(goals);
  }catch(err){
    return res.status(400).json({message: 'Fail to get goals'})
  }
}

// @desc   Set goals
// @route  POST /api/goals
// @access Private
export const setGoal = async (req, res) => {
  // 입력값이 없는 경우 에러 반환
  if(!req.body.text){
    res.status(400).json({message: 'Please, fill text field.'})
  }

  // 유저 정보도 함께 담아야 함. 그래야 수정 & 삭제 가능
  const goal = await Goal.create({
    user: req.user._id,
    text: req.body.text
  })
  res.status(200).json(goal);
}

// @desc   Update goals
// @route  PUT /api/goals/:id
// @access Private
export const updateGoal = async (req, res) => {
  try{

    if(!req.user){
      return res.status(400).json({message: 'Not Authorized'});
    }
    // 존재하는 id인지 확인
    const goal = await Goal.findById(req.user.id);
    if(goal.user.toString() !== user.id){
      return res.status(400).json({message: 'Not Authorized user is trying to access'});
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedGoal);
  }catch(err){
    return res.status(400).json({message: 'Fail to update'})
  }
}

// @desc   Delete goals
// @route  DELETE /api/goals/:id
// @access Private
export const deleteGoal = async (req, res) => {
  try{
    if(!req.user){
      return res.status(400).json({message: 'Not Authorized'});
    }
    // 존재하는 id인지 확인
    const goal = await Goal.findById(req.params.id);
    if(!goal){
      return res.status(400).json({message: 'Cannot find a goal'})
    }
    if(goal.user.toString() !== req.user.id){
      return res.status(400).json({message: 'Not Authorized'});
    }
    await goal.deleteOne();
    res.status(200).json(req.params.id);
  }catch(err){
    return res.status(400).json({message: 'Fail to delete'})
  }
}