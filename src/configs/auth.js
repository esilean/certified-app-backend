const jwt = require('jsonwebtoken')


module.exports = (request, response, next) => {

    //console.log(process.env.AUTH_SECRET)

    if (request.method === 'OPTIONS') {
        next()
    } else {

        const token = request.body.token || request.query.token || request.headers['authorization']
        //console.log(token)

        if (!token)
            return response.status(403).send({
                statusCode: 403,
                error: "Forbidden",
                message: "No token provided",
            })

        jwt.verify(token, process.env.AUTH_SECRET, function (err, decoded) {
            if (err) {
                return response.status(403).send({
                    statusCode: 403,
                    error: "Forbidden",
                    message: "Failed to authenticate token",
                })
            } else {
                request.decoded = decoded
                next()
            }

        })

    }

}