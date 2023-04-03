const asyncHandler=require('express-async-handler');
const generateToken=require('../config/token');
const User=require('../models/user');
const bcrypt=require('bcryptjs');
const nodemailer=require('nodemailer');
const UserOtpVerification=require('../models/userOtp')

//registering a user
const registerUser=asyncHandler(async(req,res)=>{
    const{name,email,aadhar,password,cpassword}=req.body;

    if(!name || !email || !aadhar || !password || !cpassword){
        res.status(400).json({"error":"Please fill all the fields"});
        return;
    }

   // checking if email is already registered
   const userExists=await User.findOne({email});
   if(userExists){
        res.status(400).json({"error":"User already registered"});
        return;
   }

   var salt=bcrypt.genSaltSync(12);
   const user=new User({
        name,email,aadhar,
        password:bcrypt.hashSync(password,salt),
        cpassword:bcrypt.hashSync(cpassword,salt)
   })

   const result=user.save();
   //registration is successful
   if(result){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            aadhar:user.aadhar,
            password:user.password,
            cpassword:user.cpassword,
            token:generateToken(user.id)
        })
   }

   //regsitrarion is not successful
   else{
    res.status(400).json({"error":"Failed to create user"});
   }

})

//verifying a registered user(Login)
const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;

    const userOTPVerificationRecords = await UserOtpVerification.find({
        email
    });
    if(userOTPVerificationRecords.length>0)
    {
        await UserOtpVerification.deleteMany({ email });
    }
    // console.log(req.body);

    const userFound=await User.findOne({email});
    const id=userFound.id;

    if(!userFound){
        res.status(400).json({"error":"invalid credentials"});
        return;
    }
    if(userFound){
        if(bcrypt.compareSync(password,userFound.password)){
            const loggedInUser=await User.findById({_id:userFound._id});
            sendOTPVerificationEmail({ id, email }, res,loggedInUser);
            // res.status(201).json({
            //     loggedInUser,token:generateToken(userFound.id),
                
            // })
            
        }
        else{
            res.status(400).json({"error":"Invalid Credentials"})
        }
    }
})





//send otp verification email
const sendOTPVerificationEmail = async ({ id, email }, res,loggedInUser) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

        let transporter = nodemailer.createTransport({
            service:'gmail',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'shubhsks123@gmail.com', // generated  user
                pass: 'yjxjfrilsjhomgrj', // generated password
            },
        });


        const mailoptions = await transporter.sendMail({
            from: 'shubhsks123@gmail.com',
            to: email,
            subject: "Verify Your Email",
            html: `<p>Enter ${otp} to verify`,
        });

        //hasing the otp
        const salt = 10;
        const hashedOTP = await bcrypt.hash(otp, salt);
        const newOTPVerification = await new UserOtpVerification({
            userId: id,
            email:email,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        });
        
        const userFound=await User.findOne({email});

        await newOTPVerification.save();
        // await transporter.sendMail(mailoptions);
        res.status(201).json({
            loggedInUser,token:generateToken(userFound.id),
            status: "PENDING",
            message: "verification otp email sent",
            // data: {
            //     userId: id,
            //     email,
            // },
           
            
        });

    } catch (error) {
        res.status(400).json({
            status: "FAILED",
            message: error.message,
        });

    }
};

const userOTP=asyncHandler(async(req,res)=>{
    try {
        const { email,otp } = req.body;
        if (!email || !otp) {
            throw Error("empty otp details not allowed");
        } else {
            const userOTPVerificationRecords = await UserOtpVerification.find({
                email
            });
            if (userOTPVerificationRecords.length <= 0) {
                //no records found
                throw new Error(
                    "Record does not exist"
                );
            } else {
                const { expiresAt } = userOTPVerificationRecords[0];
                const hashedOTP = userOTPVerificationRecords[0].otp;
                // console.log(hashedOTP);

                if (expiresAt < Date.now()) {
                    //user otp has expired
                    await UserOtpVerification.deleteMany({ email });
                    throw new Error("Code has expired. Plz request again");
                } else {
                    const validOTP = await bcrypt.compare(otp, hashedOTP);
                    if (!validOTP) {
                        throw new Error("invalid code passed")
                    } else {
                        await User.updateOne({ email},{verified:true});
                        await UserOtpVerification.deleteMany({ email });
                        res.status(201).json({
                            status: "verified",
                            message: "user email verified successfully",
                        });
                    }
                }
            }
        }

    }catch(err){
       
        res.status(400).json({
            status:"Failed",
            message:err.message,
        });
    }
})


const resendUserOTP=asyncHandler(async(req,res)=>{
    try{
        let {email}=req.body;
        const useremail = await User.findOne({ email: email });
        const id=useremail.id;
        
        if(!email){
            throw Error("empty details")
        }else{
            await UserOtpVerification.deleteMany({email});
            sendOTPVerificationEmail({id,email},res);
        }
    }catch(err){
        res.status(400).json({
            status:"Failed",
            message:err.message,
        });
    }
});
module.exports={registerUser, loginUser,userOTP,resendUserOTP};