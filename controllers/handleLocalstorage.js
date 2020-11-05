const { v4: uuidv4 } = require('uuid');

function assignUserID(req,res){
  console.log("[getSavedBooks]".bold.blue);
  console.log(`Incoming URL: ${req.url} M: ${req.method}`.blue);
  try {
    const userID = uuidv4();
    console.log(`-- assigning userID -- ${userID}`);
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


