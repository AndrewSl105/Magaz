import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const couponsSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    starts: {
      type: Date,
      required: true
    },
    ends: {
      type: Date,
      required: true
    },
    used: {
      type: Boolean,
    },
    description: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
)

const cardsShema = mongoose.Schema(
  {
    cardName: { 
      type: String,
      required: true 
    },
    validity: {
      type: String,
      required: true 
    },
    cvv: {
      type: Number,
      required: true 
    },
  }
)

const paymentInfoSchema = mongoose.Schema(
  {
    cards: [
      cardsShema
    ],
  },
  {
    timestamps: true,
  }
)

const deliveryInfoSchema = mongoose.Schema(
  {
    city: {
      type: String,
    },
    deliveryAddress: {
      type: String,
    },
    deliveryService: {
      type: String,
    },
    branchAddress: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
)

const sizeInfoSchema = mongoose.Schema(
  {
    сhestGirth: {
      type: Number,
    },
    waistCircumference: {
      type: Number,
    },
    hipGirth: {
      type: Number,
    },
    shoulderWidth: {
      type: Number,
    },
    sleeveLength: {
      type: Number,
    },
    hipGirth: {
      type: Number,
    },
    neckGirth: {
      type: Number,
    },
    legLength: {
      type: Number,
    },
    height: {
      type: Number,
    },
    shoeSize: {
      type: Number,
    },
    braSize: {
      type: Number,
    },
    internationalSize: {
      type: String,
    },
    europeanSize: {
      type: Number,
    },
    ukrainianSize: {
      type: Number,
    }
  },
  {
    timestamps: true,
  }
)

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    birthDay: {
      type: Date,
    },
    language: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isSuperAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    bonuses: {
      type: Number,
    },
    sizeInfo: sizeInfoSchema,
    coupons: [couponsSchema],
    paymentInfo: paymentInfoSchema,
    deliveryInfo: deliveryInfoSchema,
    preferences: [{
      type: String
    }]
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User