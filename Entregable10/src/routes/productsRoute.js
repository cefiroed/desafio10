import express from 'express';
import Product from '../products';

/**
 * DATOS A MANIPULAR
 */


const router = express.Router();

/*Mostrando los Products*/
const myProduct = new Product();
router.get('/list', (req, res) => {
  const data = myProduct.get();
  if (data.length == 0) {
    res.json({
      msg: 'no hay Products cargados',
    });
  }
  res.json({
    data,
  });
});

/*Listando los Products por id*/
router.get('/list/:id', (req, res) => {
    const id = req.params.id;
    const data = myProduct.getById(id);
    if (!data) {
      res.json({
        msg: 'Error Product no encontrado',
      });
    }
    res.json({
      data,
    });
  });

  /* Creamos nuestra llamada vista */
router.get('/view', (req, res) => {
  const dinamicData = {
    style:'ttable-dark',
    data: myProduct.get(),
  }
  
  res.render('main', dinamicData);
});

/*Para agregar Products a nuestra api*/
router.post('/save', (req, res) => {
    const body = req.body;
    const Product = myProduct.save(body);
    res.json({
      Product,
    });
  });

/*Para actualizar Products por id*/  
router.put('/update/:id', (req, res) => {
    const body = req.body; 
    const id = req.params.id;
    const Product = myProduct.update(body,id);
    res.json({
      Product,
    });
  });  

/*Para borrar Products por id*/   
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const Product = myProduct.delete(id);
    res.json({
      Product,
    });
  });   

/*Utilizando Multer para subir nuestro archivo index.html ubicado 
en la carpeta public*/  
const multer = require('multer');
const upload = multer({ dest: './uploads' });  

/*Creando la carpeta uploads para cargar archivos*/
const folderName = './uploads';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, folderName);
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

/*Mediante la llamada post cargamos el archivo en la carpeta uploads*/  
const uploadImproved = multer({ storage: storage });
router.post('/single', uploadImproved.single('imagen'), (req, res) => {
    try {
      res.send(req.file);
    } catch (err) {
      res.send(400);
    }
  });


export default router;















