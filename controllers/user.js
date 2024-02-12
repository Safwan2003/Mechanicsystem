const Order =require('../models/order')
const User =require('../models/user')
const Mechanic =require('../models/mechanic')
const Feedback =require('../models/feedback')

const getallMechanics = async (req, res) => {
  try {
      const mechanics = await Mechanic.find().select('-password');
      res.json(mechanics);
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server error' });
  }
};



const makeOrder = async (req, res) => {
    try {
      const userId = req.user.id;
      const orders = req.body;
      console.log('Received Request Body:', req.body);
  
      const orderResults = await Promise.all(
        orders.map(async (order) => {
          const { mechanicId,Service,Location,status } = order;
  
          const mechanicid = await Mechanic.findById(mechanicId);
  
          if (!mechanicid) {
            throw new Error(`Mechanic with ID ${mechanicid} not found`);
          }
  
          const newOrder = new Order({
            user: userId,
            mechanicId: mechanicid,
            Service,
            status,
            Location,
          });
  
          await newOrder.save();
          return newOrder;
        })
      );
  
      res.status(201).json(orderResults);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  };
  





 const getuserprofile =async(req,res)=>{
try {
    const userId = req.user.id;
    const userprofile =await User.findById(userId).select('-password');
    if(!userprofile) throw new Error('User Not found');
    res.json(userprofile)
    

} catch (err) {
    console.error(err.message)
    res.status(500).json({msg:'server error'})
}
 }

// const updateuserprofile =()=>{

// }


 const orderhistory =async(req,res)=>{
    try {
    const userId=req.user.id;
    const orderHistory= await Order.find({user:userId}).sort({
        created_at:-1
    });

res.json(orderHistory);
 } catch (err) {
    console.error(err.message)
    res.status(500).json({msg:'Server error'})
 }

 }


 const feedback = async (req, res) => {
  try {
    const mechanicId = req.params.id;
    const feedbacks = await Feedback.find({ mechanicId: mechanicId });
    res.json({ feedbacks: feedbacks });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

const submitFeedback = async (req, res) => {
  try {
    
    const {  rating, comment } = req.body;
    const mechanicId = req.params.id
const userId= req.user.id
    // Check if the mechanic exists
    const mechanic = await Mechanic.findById(mechanicId);
    if (!mechanic) {
      return res.status(404).json({ msg: 'Mechanic not found' });
    }
    
    const newFeedback = new Feedback({
      mechanicId: mechanicId,
      userId: userId,
      rating: rating,
      comment: comment
    });
    await newFeedback.save();
    res.json({ msg: 'Feedback submitted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
module.exports={feedback,submitFeedback,getallMechanics,makeOrder,getuserprofile, orderhistory}

