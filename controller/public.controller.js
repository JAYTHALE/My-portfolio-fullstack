const asyncHandler = require("express-async-handler")
const Projects = require("../models/Projects")
const Carousel = require("../models/Carousel")
const Contact = require("../models/Contact")
const { checkEmpty } = require("../utils/cheackEmpty")
const sendEmail = require("../utils/email")

exports.fetchProjects = asyncHandler(async (req, res) => {
    const result = await Projects.find()
    res.json({ message: "Project Fetch Success...!", result })
})
exports.getAllCarousel = asyncHandler(async (req, res) => {
    const result = await Carousel.find()
    res.status(200).json({ message: "Fetch Carousel Success", result })
})

exports.getProjectDetails = asyncHandler(async (req, res) => {
    const result = await Projects.findById(req.params.id)
    res.status(200).json({ message: "Fetch ProjectDetails Success", result })
})
exports.addContact = asyncHandler(async (req, res) => {
    const { name, email, mobile, company, message } = req.body
    const { error, isError } = checkEmpty({ name, email, mobile, company, message })
    if (isError) {
        return res.status(400).json({ message: "ALL Feilds Required.", error: error })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid Email" })
    }
    if (!validator.isMobilePhone(mobile, "en-IN")) {
        return res.status(400).json({ message: "Invalid Mobile" })
    }
    await sendEmail({
        to: "jaythale02@gmail.com",
        message: `compny${company},email${email},mobile${mobile},message${message}`,
        subject: `new Enquery From${company}`
    })
    await sendEmail({
        to: email,
        message: `thank you for enquery.`,
        subject: `thank you for your intrest`
    })
    await Contact.create({ name, email, mobile, company, message })
    res.json({ message: "Contact Create Success" })
})
exports.getContact = asyncHandler(async (req, res) => {
    const result = await Contact.find()
    res.status(200).json({ message: "Contact Add Success", result })
})

