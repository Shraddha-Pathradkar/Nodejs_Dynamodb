const express = require("express")
const { getData, getDataById, deleteById, addOrUpdateData } = require("./dynamodb")
const app = express()





app.use(express.json())   // to send data in a post request 
app.get("/", (req, res) => {
    res.send("HELOO")
})
app.get("/display", async (req, res) => {
    try {

        const data = await getData()
        res.json(data)

    } catch (error) {
        res.status(500).json({ errorMessage: "Something went wrong!" })
    }
})
app.post("/addNewData", async (req, res) => {
    const newData = req.body
    try {
        const data = await addOrUpdateData(newData)
        res.json(data)

    } catch (error) {
        res.status(500).json({ errorMessage: "Something went wrong!" })
    }
})

app.get("/displayByID/:id", async (req, res) => {
    const id = req.params.id
    try {

        const data = await getDataById(id)
        res.json(data)

    } catch (error) {
        res.status(500).json({ errorMessage: "Something went wrong!" })
    }
})

app.put("/updateData/:id", async (req, res) => {
    const updatedData = req.body
    const id = req.params.id
    updatedData.id = id
    try {
        const data = await addOrUpdateData(updatedData)
        res.json(data)

    } catch (error) {
        res.status(500).json({ errorMessage: "Something went wrong!" })
    }
})

app.delete("/deleteByID/:id", async (req, res) => {
    const id = req.params.id
    try {

        const data = await deleteById(id)
        res.json(data)

    } catch (error) {
        res.status(500).json({ errorMessage: "Something went wrong!" })
    }
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("server is running on port 3000")
})