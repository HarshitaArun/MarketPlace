const express = require("express")
const collection = require("./mongo")
const multer = require('multer');
const Product = require('./productModel');
const cors = require("cors")
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.get("/", cors(), (req, res)=>{

})

app.post("/", async(req, res)=>{
    const{email, password}=req.body

    try{
        const check = await collection.findOne({email:email})
        if(check){
            res.json("exist")
        }
        else{
            res.json("not exist")
        }
    }
    catch(e){
        res.json("not exist")
    }
})

app.post("/signup", async(req, res)=>{
    const{email, password}=req.body

    const data ={
        email: email, 
        password: password
    }

    try{
        const check = await collection.findOne({email:email})
        if(check){
            res.json("exist")
        }
        else{
            res.json("not exist")
            await collection.create([data])
        }
    }
    catch(e){
        res.json("not exist")
    }
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post('/sellForm', upload.single('image'), async (req, res) => {
    const { productName, brandName, condition, initialPrice, bidTime, userEmail } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
        const newProduct = new Product({
            productName,
            brandName,
            condition,
            initialPrice,
            bidTime,
            image,
            userEmail,
        });

        await newProduct.save();
        res.json({ message: 'Product listed successfully!' });
    } catch (error) {
        console.error('Error listing product:', error);
        res.status(500).json({ message: 'Failed to list product.' });
    }
});

app.listen(8000, ()=>{
    console.log("port connected")
})

