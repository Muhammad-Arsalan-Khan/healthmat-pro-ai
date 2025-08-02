import express from "express"
const Routes = express.Router()
import { signup , login, verifyEmailOTP, resendEmail, logout } from "../controller/auth.js"
import { authCheck } from "../middleware/authcheck.js"
import { authCheckAdmin } from "../middleware/admin/authcheck.js"
import upload from "../middleware/multer/multer.js"
import { uplodefile } from "../controller/uplodefile.js"

//Auth
Routes.post("/login", login)
Routes.post("/signup", signup)
Routes.post("/verifyotp/:id", verifyEmailOTP)
Routes.post("/resendemail", resendEmail)
Routes.post("/auth/logout", authCheck, logout)

//img uplode
Routes.post("/uplodefile", [authCheck, , upload.single("image")], uplodefile)


export default Routes