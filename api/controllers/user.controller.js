export const test = async (req, res, next) => {
    res.json({ message: "hi test" })
}


export const register = async (req, res, next) => {
    console.log(req.body);
}