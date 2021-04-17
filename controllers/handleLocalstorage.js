const { v4: uuidv4 } = require('uuid');

function assignUserID(req,res){
  try {
    const userID = uuidv4();
    return res.status(200).json({
      success: true, 
      userID: userID
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "assignUserID - ERROR", 
      error: err})
  };
};
  
module.exports = { assignUserID };


