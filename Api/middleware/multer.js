const multer = require('multer');


const uploadimage = multer({
  storage: multer.diskStorage({
      destination: function (req, file, cb) {
          cb(null, 'uploads');
      },
      filename: function (req, file, cb) {
          if (!file.originalname.match(/\.(png|jpg|jpeg|)$/)) {
              var err = new Error();
              err.code = 'only png,jpg & jpeg image uploaded';
              return cb(err.code);
          }
          else {
              cb(null, file.fieldname + "-" + Date.now() + '.jpg')
          }
      }
  })
}).single('file')


module.exports = uploadimage;    