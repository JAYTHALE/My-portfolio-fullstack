const router = require("express").Router()
const { rateLimit } = require("express-rate-limit")
const publicController = require("../controller/public.controller")

router
    .get("/fetch-project", publicController.fetchProjects)
    .get("/fetch-caro", rateLimit({ windowMs: 15 * 60 * 1000, limit: 1 }), publicController.getAllCarousel)
    .get("/get-project-details/:id", publicController.getProjectDetails)

    .post("/add-contact", publicController.addContact)
    .get("/get-contact", publicController.getContact)

module.exports = router

