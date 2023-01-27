const router = require('express').Router();
const authRoute = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const Book = require('../model/audio');
const userprofile = require('../model/userprofile');
const file = require('../middleware/multer');
const Audio = require('../model/audio');
const upload = require('../middleware/multer');
const audio = require('../model/audio');
const multer = require('multer');
const path = require('path')
const fs = require('fs');
const uploadsong = require('../middleware/audiomulter')
const uploadController = require('../controller/upload.controller');




//register

router.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.json({ success: false, message: "Hashing error" })
        } else {
            const user = new User({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                mobile: req.body.mobile,
                password: hash,
            })
            user.save(
                function (err) {
                    if (err) {
                        if (err.errors != null) {
                            if (err.errors.username) {
                                res.status(401).json({ success: false, message: 'Required minimum digits 3 of username' });
                            } else if (err.errors.name) {
                                res.status(401).json({ success: false, message: 'Required minimum digits 3 of First Name' });
                            } else if (err.errors.mobile) {
                                res.status(401).json({ success: false, message: 'Required mobile number 10 digits' });
                            } else if (err.errors.email) {
                                res.status(401).json({ success: false, message: 'pls enter valid email address' });
                            } else if (err.errors.password) {
                                res.status(401).json({ success: false, message: 'use strong password' });
                            }
                        } else {
                            res.status(400).json({ success: false, message: 'err' });
                        }
                    } else {
                        res.status(200).json({ success: true, message: 'Successfully Registered !' });
                    }
                })
        }
    });
})


//login
router.post('/login', (req, res) => {
    User.find({ username: req.body.username }).exec().then((result) => {
        if (result.length < 1) {
            return res.json({ success: false, message: "User Not Found" })
        }
        const user = result[0]

        bcrypt.compare(req.body.password, user.password, (err, ret) => {
            token = req.signedCookies.token;
            if (ret) {
                const payload = {
                    userId: user._id
                }
                const token = jwt.sign(payload, "webBatch")

                res.cookie("token", token)
                return res.json({ success: true, token: token, message: "Login Successful." })
            } else {
                return res.json({ success: false, message: "Passowrd does not Match!." })
            }
        })
    }).catch(err => {
        res.json({ success: false, message: "Authentication failed !!" })
    })
})


//profile get
router.get('/profile', checkAuth, (req, res) => {
    const userId = req.userData.userId;
    User.findById(userId).exec().then((result) => {
        res.json({ success: true, data: result })

    }).catch(err => {
        res.json({ success: false, message: "Server error" })
    })
})

router.patch("/update/:id", async (req, res) => {
    try {
        const updateduser = await User.updateOne({ _id: req.params.id }, { $set: req.body });
        res.status(200).json(updateduser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const deleteduser = await User.deleteOne({ _id: req.params.id });
        res.status(200).json(deleteduser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

router.get("/get", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Cannot get User data" });
    }
})

//   router.get("/sendprofile", file.any(), async (req, res) => {
//     try {

//       let data = await UserProfile.findOne({ Email: req.body.email });
//       res.status(200).json(data);

//     } catch (error) {
//       res.status(500).json(error);

//     }
//   });

//   router.post("/Profileget", file.single("image"), async (req, res) => {
//     try {
//       let img = req.file.filename
//       req.body.image = img

//       let data = await UserProfile(req.body);
//       let result = await data.save();

//       res.status(200).json("Done")

//     } catch (error) {
//       res.status(403).json("something went wrong")
//       console.log(error);
//     }
//   });

//   router.delete("/Profiledelete/:_id", async (req, res) => {
//     let img = await UserProfile.findOne(req.params);

//     let delimg = img.image;
//     try {
//       fs.unlinkSync(`./images/` + delimg);
//     } catch (error) { }
//     let data = await UserProfile.deleteOne(req.params);
//     if (data.deletedCount == 0) {
//       console.log("Data not found!");
//       res.send("Data not found!")
//     } else {
//       res.send(data);
//     }
//   });

//   router.put("/Profileupdate/:_id", file.single("image"), async (req, res) => {

//     try {
//       let data = await UserProfile.findById(req.params);
//       let delimg = data.image;

//       console.log(delimg)
//       console.log(req.params);
//       // console.log(data);
//       if (!data) {
//         console.log("id not found");
//         res.status(404).json("id not found");
//       } else {
//         try {
//           let upimg = req.file.filename
//           if (upimg) {
//             fs.unlinkSync(`./images/` + delimg);
//           }
//         }
//         catch (error) {
//           console.log(error);

//         }
//         try {
//           let upimg = req.file.filename
//           req.body.image = upimg;
//         } catch (error) {
//           //  console.log(error);
//         }
//         //  console.log(req.params);
//         //  console.log(req.body);
//         let data = await UserProfile.updateOne(req.params, { $set: req.body });
//         if (data.modifiedCount == 1) {
//           res.json({ success: true, message: "Profile and details updated!" });
//           console.log("Profile and details updated!");
//         }
//       }
//     } catch (error) {
//       res.json({ success: false, message: "something went wrong" });
//       console.log(error);
//     }
//   });

router.delete("/delete/:id", async (req, res) => {
    try {
        const deleteduser = await User.deleteOne({ _id: req.params.id });
        res.status(200).json(deleteduser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

router.get("/get/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(404).json({ message: "Cannot get Users" });
    }
})


router.get("/get", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Cannot get User data" });
    }
})





//add user 
router.post('/add-user', (req, res, next) => {
    userprofile.create(req.body, (error, data) => {
        if (error) {
            return next(error);

        } else {
            const user = new userprofile({

                firstname: req.body.firstname,
                lastname: req.body.lastname,
                gender: req.body.gender,
                age: req.body.age,
                address: req.body.address,
            })
            // user.save();
            return res.json({ success: true, message: 'Added ' })
        }
    });
});


router.get('/', (req, res) => {
    userprofile.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
        }
    });
});

router.get('/read-user/:id', (req, res, next) => {
    userprofile.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    });
});

router.put('/update-user/:id', (req, res, next) => {
    userprofile.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(req.body)
            console.log('user updated successfully !!');
        }
    })
})

router.delete('/delete-user/:id', (req, res, next) => {
    userprofile.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: "user Deleted successfull"
            })
        }
    })
})

//add audio

router.post('/audio', upload, (req, res) => {

    const audio = new Audio();
    audio.name = req.body.name;
    audio.description = req.body.description;
    if (req.file) {
        // audio.audioimage = req.file.filename;
        // audio.audioimage_path = 'http://localhost:8080/' + req.file.filename;
        audio.audioplayer = req.file.filename;
        audio.audioplayer_path = 'http://localhost:8080/' + req.file.filename;
    }
    audio.save(
        function (err) {
            if (err) {
                if (err.errors != null) {
                    if (err.errors.name) {
                        res.status(401).json({ success: false, message: 'Required minimum digits 3 of name' });
                    } else if (err.errors.description) {
                        res.status(401).json({ success: false, message: 'Required minimum digits 3 of description' });
                    } else if (err.errors.audioimage) {
                        res.status(401).json({ success: false, message: 'Required ' });
                    } else { res.status(400).json({ success: false, message: err.message }); }
                } else {
                    res.status(400).json({ success: false, message: err });
                }
            } else {
                return res.json({ success: true, message: 'Added song ' })
            }
        }

    )

})


router.get('/audioget', (req, res) => {
    audio.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
        }
    });
});

router.get('/read-audio/:id', (req, res, next) => {
    audio.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    });
});
router.delete('/delete-audio/:id', (req, res, next) => {
    audio.findByIdAndDelete(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            //  console.log(res);
            })
        }
    })
})

 router.put('/update-audio/:id', upload, (req, res) => {
        audio.findOne({ _id: req.params.id }, function (err, data) {
            if (err) throw err;
            if (!data) {
                res.status(200).json({ success: false, message: 'No book found' });
            }
            else if (!req.file) {
                data.name = req.body.name;
                data.description = req.body.description;
                // data.quantities = req.body.quantities;
                // data.price = req.body.price;
                data.save(
                    function (err) {
                        if (err) {
                            if (err.errors != null) {
                                if (err.errors.name) {
                                    res.status(401).json({ success: false, message: 'Required minimum digits 3 of name' });
                                } else if (err.errorsd.description) {
                                    res.status(401).json({ success: false, message: 'Required description' });
                                }
                            } else {
                                res.status(400).json({ success: false, message: 'err' });
                            }
                        } else {
                            res.status(200).json({ success: true, message: 'Successfully Registered !' });
                        }
                    }
                );

            }
            else {
                fs.unlinkSync(`./uploads/${data.file}`);
                console.log(data.file);
                data.name = req.body.name;
                data.description = req.body.description;
                data.audioimage= req.body.audioimage
                data.audioimage_path = 'http://localhost:8080/' + req.file.audioimage;
              
                data.save(function (err) {
                    if (err) {
                        if (err.errors != null) {
                            if (err.errors.name) {
                                res.status(401).json({ success: false, message: 'Required minimum digits 3 of name' });
                            } else
                                if (err.errors.description) {
                                    res.status(401).json({ success: false, message: 'Required decriprtion' });
                                } 
                        } else {
                            res.status(400).json({ success: false, message: 'err' });
                        }
                    } else {
                        res.status(200).json({ success: true, message: 'Successfully updated !' });
                    }
                });
            }
        })
    })


// router.post('/add-user', (req, res, next) => {
//     userprofile.create(req.body, (error, data) => {
//         if (error) {
//             return next(error);

//         } else {
//             const user = new userprofile({

//                 firstname: req.body.firstname,
//                 lastname: req.body.lastname,
//                 gender: req.body.gender,
//                 age: req.body.age,
//                 address: req.body.address,
//             })
//             // user.save();
//             return res.json({ success: true, message: 'Added ' })
//         }
//     });
// });



module.exports = router;

