import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    lastName: '',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    gender: 'man',
    phoneNumber: '+380977291344',
    language: 'ukrainian',
    bonuses: 45,
    sizeInfo: {
      сhestGirth: 56,
      internationalSize: 'L'
    },
    deliveryInfo: {
      city: 'Kharkiv',
      deliveryAddress: 'Moskovsky Lane',
    }
  },
  {
    name: 'Super Admin',
    email: 'superAdmin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isSuperAdmin: true,
    gender: 'man',
    phoneNumber: '+380977291344',
    language: 'ukrainian',
    bonuses: 45,
    sizeInfo: {
      сhestGirth: 56,
      internationalSize: 'L'
    },
    deliveryInfo: {
      city: 'Kharkiv',
      deliveryAddress: 'Moskovsky Lane',
    }
  },
  {
    name: 'John Doe',
    lastName: '',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
    gender: 'man',
    phoneNumber: '+380977291344',
    language: 'english',
    bonuses: 65,
    sizeInfo: {
      сhestGirth: 56,
      internationalSize: 'L'
    },
    deliveryInfo: {
      city: 'Kiev',
      deliveryAddress: 'Moskovsky Lane',
    }
  },
  {
    name: 'Jane Doe',
    lastName: '',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
    gender: 'wooman',
    phoneNumber: '+380977291344',
    language: 'english',
    bonuses: 65,
    sizeInfo: {
      сhestGirth: 76,
      internationalSize: 'L'
    },
    deliveryInfo: {
      city: 'Kharkiv',
      deliveryAddress: 'Moskovsky Lane',
    }
  },
]

export default users
