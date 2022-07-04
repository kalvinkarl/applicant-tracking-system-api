const User = require("../models/user.model");
const UserVerification = require("../models/user.verification.model");

const config = require("../config/config.json");
const transporter = require("../utils/mailer");

const jwt = require('jsonwebtoken');
const Bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');

//roles:
//su - super user
//hr - admin
//ev - evaluator
//ap - applicant

// Find a single user by Username
exports.findByUsername = (req, res) => {
	let username = req.params.username.trim();
	User.findByUsername(username, (error, result) => {
		if (!error) {
			res.send(result);
		} else {
			if (error === "NOT_FOUND") {
				res.status(404).send({ message: "A user not found with username of " + username });
			} else {
				res.status(500).send({ message: "Error retrieving a user in database", error });
			}
		}
	})
}
// Find a single user by email
exports.findByEmail = (req, res) => {
	let email = req.params.email.trim();
	User.findByEmail(email, (error, result) => {
		if (!error) {
			res.send(result);
		} else {
			if (error === "NOT_FOUND") {
				res.status(404).send({ message: "A user not found with email of " + email });
			} else {
				res.status(500).send({ message: "Error retrieving a user in database", error });
			}
		}
	})
}
// Send verification
const sendVerification = (user,res) => {
	//url to be used in email
	const currentUrl = config.url;
	const uniqueString = uuidv4();
	const mailOptions = {
		from: config.email.AUTH_EMAIL,
		to: user.email,
		subject: "Verify your Email",
		html: `<p>Verify your email address to complete the signup and login into your account.</p><p>This link <b>expires in 6 hours</b>.</p><p>Press <a href=${currentUrl+"user/verify/"+user.id+"/"+uniqueString}>here</a> to proceed.</p>`
	}
	let userVerification = new UserVerification({
		userId: user.id,
		uniqueString: Bcrypt.hashSync(uniqueString, 12),
		createdAt: new Date(Date.now()),
		expiresAt: new Date(Date.now()+21600000)
	})
	UserVerification.create(userVerification, (error,result) => {
		if(!error){
			// email verification send
			transporter.sendMail(mailOptions,(err,info)=>{
				if(!err){
					res.send({ message: "Verification email sent." , result, info });
				} else {
					res.status(500).send({ message: "Some error occurred while sending email." , err })
				}
			})
		} else {
			res.status(500).send({ message: "Some error occurred saving verification.", error })
		}
	})
}
// Create and Save a new User
exports.create = (req, res) => {
	// Validate request
	if (!req.body) {
			res.status(400).send({
					message: "Content can not be empty!"
			});
	}
	// Checking if user already exists
	User.findByUsername(req.body.username, async (usernameError) => {
		User.findByEmail(req.body.email, (mailError) => {
			if(!mailError && !usernameError){
				res.status(409).send({
					title: "Exist",
					message: "User is already exist, please login using your username " + req.body.username
				});
			} else if(!usernameError) {
				res.status(409).send({
					title: "Username",
					message: "A user is already exist using your username " + req.body.username
				});
			} else if(!mailError) {
				res.status(409).send({
					title: "Email",
					message: "A user is already exist using your email address " + req.body.email
				});
			}else{
				if (usernameError === "NOT_FOUND" && mailError === "NOT_FOUND") {
					// Create a User
					let user = new User({
							username: req.body.username,
							email: req.body.email,
							password: Bcrypt.hashSync(req.body.password, 12),
							accessLevel: req.body.accessLevel,
					});
					User.create(user, (error, result) => {
							if (!error){
								sendVerification(result,res);
							} else {
								res.status(500).send({ message: "Some error occurred while creating the User.", error });
							}
					});
				} else {
					res.status(500).send({ message: "Error checking for existing user in database", mailError });
				}
			}
		})
	})
}
// Login user
const userLogin = (user, req, res, err) => {
	if (!err) {
		let passwordIsEqual = Bcrypt.compareSync(req.body.password, user.Password);
		if(!passwordIsEqual){
			res.status(401).send({ 
				message: "Incorrect password."
			});
		}else{
			if(!user.Verified){
				res.status(403).send({message: "Email hasn't been verified yet."})
			}else{
				res.send({message: "Successfully login"})
				// let token = jwt.sign({
				// 	AccessionLevel: data.AccessionLevel,
				// 	Username: data.Username,
				// 	ID: data.ID
				// },'secretfortoken',{expiresIn: '1h'});
				// res.send({ token: token });
			}
		}
	} else {
		if (err === "NOT_FOUND") {
			res.status(404).send({
				message: "User not found"
			})
		} else {
			res.status(500).send({
				message: "Error retrieving User "
			})
		}
	}
}
// Check login username or email
exports.login = (req, res) => {
	// Validate Request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!"
		})
	}
	if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(req.body.username)) {
		// Login using username
		User.findByUsername(req.body.username.trim(), (error, result) => {
			userLogin(result, req, res, error)
		})
    } else {
		// Login using email address
		User.findByEmail(req.body.username.trim(), (error, result) => {
			userLogin(result, req, res, error)
		})
	}
}
// Verify email confimation
exports.verify = (req,res) => {
	let userId = req.params.id.trim();
	let uniqueString = req.params.uniqueString.trim();
	UserVerification.findById(userId, (error,result)=>{
		if(!error){
			if(result.ExpiresAt < Date.now()){
				UserVerification.deleteById(userId,(err)=>{
					if(!err){
						User.deleteById(userId,(er)=>{
							if(!er){
								res.status(401).send({ message: "Verification code expired. Please sign up again" })
							}else if(er === "NOT_FOUND"){
								res.status(404).send({ message: "User not found" })
							}else{
								res.status(500).send({ message:"Some error occured while deleting expired user by verification" })
							}
						})
					}else if(err === "NOT_FOUND"){
						res.status(404).send({ message: "Verification not found" })
					}else{
						res.status(500).send({ message:"Some error occured while deleting verification",err })
					}
				})
			}else{
				equalString = Bcrypt.compareSync(uniqueString,result.UniqueString);
				if(equalString){
					User.updateVerified(userId, true, (err) => {
						if(!err){
							UserVerification.deleteById(userId,(er)=>{
								if(!err){
									res.send({ message: "Successfully verified!" })
								}else if(er === "NOT_FOUND"){
									res.status(404).send({ message: "Removing verification not found" })
								}else{
									res.status(500).send({ message:"Some error occured while removing verification",err })
								}
							})
						}else if(err === "NOT_FOUND"){
							res.status(404).send({ message: "Update a user not found" })
						}else{
							res.status(500).send({ message:"Some error occured while updating user",err })
						}
					})
				}else{
					res.status(401).send({ message: "Invalid verification details passed. Please check your inbox"})
				}
			}
		} else {
			if(error === "NOT_FOUND"){
				res.status(404).send({ message: "User verification not found" })
			}else{
				res.status(500).send({ message:"Some error occured while finding user" })
			}
		}
	})
}