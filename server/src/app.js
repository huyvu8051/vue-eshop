const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('./models')
const config = require('./config/config')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require ('./routers') (app)

const {Song, Artist, User, Product, Category} = require('./models')

sequelize.sync({force: true})
    .then(() => {
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
}).then(() => {
    
// Init database
  User.create({
    email: 'huyvu8051@gmail.com',
    password: '123456789'
  })

  Artist.create({
    name: 'son tung mtp'
  })
  Artist.create({
    name: 'soobin hoang son'
  })
  Artist.create({
    name: 'bich Phuong'
  })
  Artist.create({
    name: 'erik'
  })
  Song.create({
    title: 'chung ta cua hien tai',
    ArtistId: 1
  })
  Song.create({
    title: 'muon roi ma sao con',
    ArtistId: 1
  })
  Song.create({
    title: 'chay ngay di',
    ArtistId: 1
  })
  Song.create({
    title: 'em khong sai chung ta sai',
    ArtistId: 4
  })
  Song.create({
    title: 'bua yeu',
    ArtistId: 3
  })
  Song.create({
    title: 'payah',
    ArtistId: 2
  })
  Song.create({
    title: 'em con hut thuoc khong',
    ArtistId: 3
  })

  // product category

  Category.create({
    name: 'Honda'
  })
  Category.create({
    name: 'Yamaha'
  })
  Category.create({
    name: 'Suzuki'
  })
  Category.create({
    name: 'Kawasaki'
  })
  Category.create({
    name: 'BMW'
  })
  Category.create({
    name: 'Ducati'
  })

  // product

  Product.create({
    name: 'Kawasaki ninja H2',
    price: 696969,
    quantity: 5,
    avalable: true,
    img: '1.img',
    url: 'thisisurl',
    detail: 'this is detail',
    CategoryId: 4
  })
  Product.create({
    name: 'Honda RC213v',
    price: 55555,
    quantity: 5,
    avalable: true,
    img: '1.img',
    url: 'thisisurl',
    detail: 'this is detail',
    CategoryId: 1
  })
  Product.create({
    name: 'Honda Winner X',
    price: 696969,
    quantity: 5,
    avalable: true,
    img: '1.img',
    url: 'thisisurl',
    detail: 'this is detail',
    CategoryId: 1
  })
  Product.create({
    name: 'Honda CBR 1000RRR',
    price: 696969,
    quantity: 5,
    avalable: true,
    img: '1.img',
    url: 'thisisurl',
    detail: 'this is detail',
    CategoryId: 1
  })
  Product.create({
    name: 'Yamaha Exciter 155 VVA',
    price: 696969,
    quantity: 5,
    avalable: true,
    img: '1.img',
    url: 'thisisurl',
    detail: 'this is detail',
    CategoryId: 2
  })
  Product.create({
    name: 'Yamaha MT10',
    price: 696969,
    quantity: 5,
    avalable: true,
    img: '1.img',
    url: 'thisisurl',
    detail: 'this is detail',
    CategoryId: 2
  })
  Product.create({
    name: 'Yamaha YZF R1M',
    price: 696969,
    quantity: 5,
    avalable: true,
    img: '1.img',
    url: 'thisisurl',
    detail: 'this is detail',
    CategoryId: 2
  })
  Product.create({
    name: 'Suzuki R1000',
    price: 696969,
    quantity: 5,
    avalable: true,
    img: '1.img',
    url: 'thisisurl',
    detail: 'this is detail',
    CategoryId: 3
  })
  Product.create({
    name: 'Suzuki Satria F150',
    price: 696969,
    quantity: 5,
    avalable: true,
    img: '1.img',
    url: 'thisisurl',
    detail: 'this is detail',
    CategoryId: 3
  })
  Product.create({
    name: 'Suzuki Bandit F150',
    price: 696969,
    quantity: 5,
    avalable: true,
    img: '1.img',
    url: 'thisisurl',
    detail: 'this is detail',
    CategoryId: 3
  })
  Product.create({
    name: 'BMW cc',
    price: 696969,
    quantity: 5,
    avalable: true,
    img: '1.img',
    url: 'thisisurl',
    detail: 'this is detail',
    CategoryId: 5
  })
  Product.create({
    name: 'BMW S1000R',
    price: 696969,
    quantity: 5,
    avalable: true,
    img: '1.img',
    url: 'thisisurl',
    detail: 'this is detail',
    CategoryId: 5
  })
  Product.create({
    name: 'BMW S1000RR',
    price: 696969,
    quantity: 5,
    avalable: true,
    img: '1.img',
    url: 'thisisurl',
    detail: 'this is detail',
    CategoryId: 5
  })
  Product.create({
    name: 'Kawasaki Ninja ZX-10RR',
    price: 696969,
    quantity: 5,
    avalable: true,
    img: '1.img',
    url: 'thisisurl',
    detail: 'this is detail',
    CategoryId: 4
  })
  Product.create({
    name: 'Ducati V4R',
    price: 696969,
    quantity: 5,
    avalable: true,
    img: '1.img',
    url: 'thisisurl',
    detail: 'this is detail',
    CategoryId: 6
  })
  Product.create({
    name: 'Ducati StreetFighter V4',
    price: 696969,
    quantity: 5,
    avalable: true,
    img: '1.img',
    url: 'thisisurl',
    detail: 'this is detail',
    CategoryId: 6
  })

})
