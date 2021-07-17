const {User,Role, Product, Category} = require('./models')

var details = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error, distinctio. Tempore mollitia itaque sunt, commodi nulla nisi, voluptate magnam ipsa vero dolorem animi blanditiis accusamus expedita quibusdam nihil quod ratione. Lorem \nLorem ipsum dolor, sit amet consectetur adipisicing elit. Error, distinctio. Tempore mollitia itaque sunt, commodi nulla nisi, voluptate magnam ipsa vero dolorem animi blanditiis accusamus expedita quibusdam nihil quod ratione. Lorem\nLorem ipsum dolor, sit amet consectetur adipisicing elit. Error, distinctio. Tempore mollitia itaque sunt, commodi nulla nisi, voluptate magnam ipsa vero dolorem animi blanditiis accusamus expedita quibusdam nihil quod ratione. Lorem \nLorem ipsum dolor, sit amet consectetur adipisicing elit. Error, distinctio. Tempore mollitia itaque sunt, commodi nulla nisi, voluptate magnam ipsa vero dolorem animi blanditiis accusamus expedita quibusdam nihil quod ratione. Lorem'


module.exports = async () => {
    
    // Init database
      await Role.create({
        name: 'ROLE_USER'
      }).then(async () => {
        await User.create({
          email: 'user@gmail.com',
          password: 'Huy12345',
        }).then(async(user) => {
          await user.addRole(await Role.findByPk(1))
        })
      })
      await Role.create({
        name: 'ROLE_ADMIN'
      }).then(async () => {
        await User.create({
          email: 'admin@gmail.com',
          password: 'Huy12345',
        }).then(async(user) => {
          await user.addRole(await Role.findByPk(2))
        })
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
        available: true,
        img: 'kawasaki-ninja-h2.png',
        url: 'thisisurl',
        detail: details,
        CategoryId: 4
      })
      Product.create({
        name: 'Honda RC213v',
        price: 55555,
        quantity: 5,
        available: true,
        img: '138f9b5a-b661-42b8-952d-1ce06385b0cc.jpeg',
        url: 'thisisurl',
        detail: details,
        CategoryId: 1
      })
      Product.create({
        name: 'Honda Winner X',
        price: 696969,
        quantity: 5,
        available: true,
        img: 'color-chart.jpg',
        url: 'thisisurl',
        detail: details,
        CategoryId: 1
      })
      Product.create({
        name: 'Honda CBR 1000RRR',
        price: 696969,
        quantity: 5,
        available: true,
        img: '2020-cbr1000rr-rstudio-stdtrico0009s-1597147168055574880689.jpg',
        url: 'thisisurl',
        detail: details,
        CategoryId: 1
      })
      Product.create({
        name: 'Yamaha Exciter 155 VVA',
        price: 696969,
        quantity: 5,
        available: true,
        img: '28_gia-xe-yamaha-exciter-155.png',
        url: 'thisisurl',
        detail: details,
        CategoryId: 2
      })
      Product.create({
        name: 'Yamaha MT10',
        price: 696969,
        quantity: 5,
        available: true,
        img: '2020-Yamaha-MT10-EU-Tech_Black-Studio-001-03.jpg',
        url: 'thisisurl',
        detail: details,
        CategoryId: 2
      })
      Product.create({
        name: 'Yamaha YZF R1M',
        price: 696969,
        quantity: 5,
        available: true,
        img: '2020_R1M__38808.1610965142.jpg',
        url: 'thisisurl',
        detail: details,
        CategoryId: 2
      })
      Product.create({
        name: 'Suzuki R1000',
        price: 696969,
        quantity: 5,
        available: true,
        img: '2021-Suzuki-GSX-R1000-Hero-Image.jpg',
        url: 'thisisurl',
        detail: details,
        CategoryId: 3
      })
      Product.create({
        name: 'Suzuki Satria F150',
        price: 696969,
        quantity: 5,
        available: true,
        img: 'trang-do-den.png',
        url: 'thisisurl',
        detail: details,
        CategoryId: 3
      })
      Product.create({
        name: 'Suzuki Bandit F150',
        price: 696969,
        quantity: 5,
        available: true,
        img: 'xe-xam.png',
        url: 'thisisurl',
        detail: details,
        CategoryId: 3
      })
      Product.create({
        name: 'BMW cc',
        price: 696969,
        quantity: 5,
        available: true,
        img: '1.png',
        url: 'thisisurl',
        detail: details,
        CategoryId: 5
      })
      Product.create({
        name: 'BMW S1000R',
        price: 696969,
        quantity: 5,
        available: true,
        img: 'bmw-s1000r-2017.jpg',
        url: 'thisisurl',
        detail: details,
        CategoryId: 5
      })
      Product.create({
        name: 'BMW S1000RR',
        price: 696969,
        quantity: 5,
        available: true,
        img: 'ca-map-BMW-S1000RR-1200x900.jpg',
        url: 'thisisurl',
        detail: details,
        CategoryId: 5
      })
      Product.create({
        name: 'Kawasaki Ninja ZX-10RR',
        price: 696969,
        quantity: 5,
        available: true,
        img: '538de4e7-f71b-49ee-ade3-884011512bd6.jpg',
        url: 'thisisurl',
        detail: details,
        CategoryId: 4
      })
      Product.create({
        name: 'Ducati V4R',
        price: 696969,
        quantity: 5,
        available: true,
        img: 'Panigale-V4-R-MY19-Red-01-Model-Preview-1050x650.png',
        url: 'thisisurl',
        detail: details,
        CategoryId: 6
      })
      Product.create({
        name: 'Ducati StreetFighter V4',
        price: 696969,
        quantity: 5,
        available: true,
        img: 'Diavel-1260-MY20-01-Gallery-1920x1080.jpg',
        url: 'thisisurl',
        detail: details,
        CategoryId: 6
      })
    
    }