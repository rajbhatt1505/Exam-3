const multer = require('multer')
// const uploadsong = multer({ storage })

const uploadsong = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'songs');
        },
        filename: function (req, file, cb) {
            if (!file.originalname.match(/\.(mp3)$/)) {
                var err = new Error();
                err.code = 'mp3 only uploaded';
                return cb(err.code);
            }
            else {
                cb(null, file.fieldname + "-" + Date.now() + '.mp3')
            }
          
        }
        })
    
}).single('song')



module.exports = uploadsong;