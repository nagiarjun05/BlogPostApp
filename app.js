const express=require('express');
const app=express();
const cors=require('cors');
const bodyParser=require('body-parser');
const path=require('path');
const sequelize =require('./util/database')

const User=require('./models/user')
const Blog=require('./models/blog')

app.use(cors());

const userRoutes=require('./routes/user');
const homeRoutes=require('./routes/home');

// app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.use('/user',userRoutes);
app.use('/home',homeRoutes);


app.use((req,res)=>{
    res.sendFile(path.join(__dirname, `views/${req.url}`))
});

User.hasMany(Blog);
Blog.belongsTo(User);

sequelize
.sync()
// .sync({force: true})
.then(()=>{
    app.listen(8080)
})
.catch(err=>console.log(err))