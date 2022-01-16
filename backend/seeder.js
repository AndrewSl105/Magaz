import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Board from './models/boardModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'
import boards from './data/boards.js'
import axios from 'axios';
import BlogPost from './models/blogPostModel.js'
import blogPosts from './data/blogPOsts.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    // await Product.deleteMany()
    await User.deleteMany()
    await Board.deleteMany()
    await Product.deleteMany()

    await User.deleteMany()
    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id;
    
    const newArray = [];


    const getProductsArray = async (url) => {
      return await axios.get(url)
      .then(response => {
        return response.data
      })
      .catch(error => {
        console.log(error);
      });
    };
    
    const createMainCategory = (el) => {
      if (el.includes()) {
        
      }
    }
    
    const newlist = await getProductsArray('https://msdrop.com.ua/export/RWwn/json');
    
    newlist.map(item => {

      return newArray.push(
        {
          name: item.name,
          sku: item.sku,
          price: item.price,
          category: [item.category],
          mainCategory: '',
          description: item.description,
          gallery: item.gallery,
          country: item.country || '',
          gender: item.gender || '',
          from: 'https://msdrop.com.ua/',
          brand: item.brand || '',
          hashtags: [],
          reviews: [],
          sizes: item.sizes || [],
          rating: 0,
          numReviews: 0,
          price: item.price,
          visibility: false,
        }
      )
    })

    const sampleProducts = newArray.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)

    const sampleBoards = boards.map((board) => {
      return { ...board, user: adminUser }
    })

    await Board.insertMany(sampleBoards)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
