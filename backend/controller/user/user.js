import User from "../models/loanSchema.js" //yaha schema aye ga


const getData = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    const err = new Error("error getting users data")
    err.statusCode = 500
    throw err
  }
}

const createData = async (req, res) => {
  try {
    const {a, b, c} = req.body
    const data = { a, b , c}
    const newUser = new User(data)
    await newUser.save()
    res.status(201).json(newUser)
  } catch (error) {
    const err = new Error("error creating user data")
    err.statusCode = 500
    throw err
  }
}


const updateData = async (req, res) => {
  try {
    const id = req.params.id
    const {a, b, c} = req.body
    const data = { a, b , c}
    const updatedUser = await User.findOneAndUpdate(
      { id },
       data,
      { new: true }
    )
    if (!updatedUser) {
      const err = new Error("user data not found")
      err.statusCode = 400
      throw err
    }
    res.status(200).json(updatedUser)
  } catch (error) {
    const err = new Error("error update user data")
    err.statusCode = 500
    throw err
  }
}

const modifyData = async (req, res) => {
  try {
    const id = req.params.id
    const {a, b, c} = req.body
    const data = { a, b , c}
    const modifiedUser = await User.findOneAndReplace(
      { id },
      data,
      { new: true }
    )
    if (!modifiedUser) {
      const err = new Error("user not found")
      err.statusCode = 400
      throw err
    }
    res.status(200).json(modifiedUser);
  } catch (error) {
    const err = new Error("error modifying user data")
    err.statusCode = 500
    throw err
  }
}

const deleteData = async (req, res) => {
  try {
    const id = req.params.id
    const deletedUser = await User.findByIdAndDelete(id)
    if (!deletedUser) {
      const err = new Error("user data not found")
      err.statusCode = 400
      throw err
    }
    res.status(200).json({ message: "user deleted successfully" })
  } catch (error) {
    const err = new Error("error deleting user data")
    err.statusCode = 500
    throw err
  }
}

export  {
  getData,
  createData,
  updateData,
  modifyData,
  deleteData,
}
