const multer = require('multer');


const uploadimage = multer({
  storage: multer.diskStorage({
      destination: function (req, file, cb) {
          cb(null, 'uploads');
      },
      filename: function (req, file, cb) {
          if (!file.originalname.match(/\.(png|jpg|jpeg|mp3)$/)) {
              var err = new Error();
              err.code = 'only png,jpg,mp3 & jpeg image uploaded';
              return cb(err.code);
          }
          else {
              cb(null, file.fieldname + "-" + Date.now() + '.mp3')
          }
      }
  })
}).single('file')


module.exports = uploadimage;    