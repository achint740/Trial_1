//-----------------------------REQUIRE EXPRESS-----------------------------
const exp = require("express");
const app = exp();


//-----------------------------REQUIRE MongoDB-----------------------------
const {MongoClient} = require('mongodb');
//-----------------------------PORT 27017-----------------------------
const MONGO_URL = 'mongodb://localhost:27017';
const DB_NAME = 'xyz_foods_db';


//----------------------------------------------------------

app.use(exp.json())
app.use(exp.urlencoded({extended:true})) 

//----------------------------------------------------------




//-----------------------------Connection Check for MongoDB-----------------------------
// (async () => {
//     const client = await MongoClient.connect(MONGO_URL)
//     const q = client.db(DB_NAME)
//     console.log(q);
// })()    





//-----------------------------Write Function for MongoDB-----------------------------

async function writeUser(obj){
    const client = await MongoClient.connect(MONGO_URL);
    const p = client.db(DB_NAME);
    const q = p.collection('q');
    const res = await q.insertOne(obj);
    console.log(res);
}




//-----------------------------LOAD SITE ON REQUEST TO '/' -----------------------------

app.use('/',exp.static(__dirname + '/public'));




//-----------------------------LOAD MENU ON REQUEST TO '/Menu' -----------------------------

app.use('/menu',exp.static(__dirname + '/public/Menu'));





//-----------------------------LOAD CART ON REQUEST TO '/CartView' -----------------------------

app.use('/cart/view',exp.static(__dirname + '/public/CartView'));




//-----------------------------Initially, CART = EMPTY ----------------------------
let cart = [];
// let total = 0;




//-----------------------------POST REQUEST FOR ADDING TO CART-----------------------------

app.post('/addcart',function(req,res){
    cart.push(
        {
            name : req.body.name,
            price : +(req.body.price),
            times : +(req.body.times)
        }
    );
    // total = total + req.query.price;
    res.send('Success');
});


//-----------------------------POST REQUEST FOR UPDATING CART-----------------------------

app.post('/updatecart',function(req,res){
    for(i=0;i<cart.length;i++){
        if(cart[i].name == req.body.name){
            //Work According to Instruction Passed
            if(req.body.work == 'dec')
                cart[i].times--;
            else    
                cart[i].times++;
            if(cart[i].times == 0)
                cart.splice(i,1);
            break;
        }
    }
    res.send('Success');
});

//-----------------------------GET REQUEST FOR FETCHING CART-----------------------------

app.get('/getcart',(req,res)=>{
    res.send(cart);
});




//-----------------------------POST REQUEST FOR ADDING A USER TO MongoDB-----------------------------

app.post('/adduser',(req,res)=>{
    let obj = {
        name : req.body.name,
        mobile : (req.body.number),
        password : req.body.password,
        email : req.body.email
    }
    writeUser(obj);
    res.send('Success');
});




//-----------------------------FOR ALL OTHER REQUESTS-----------------------------

app.get('*',(req,res)=>{
    res.send('Not Found!!');
});




//-----------------------------LOCALHOST 5500-----------------------------

app.listen(5500,()=>{
    console.log('Server Started!!');
});

