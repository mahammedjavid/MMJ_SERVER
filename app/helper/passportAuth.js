const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
const { UserTable } = require('../../models/index')

function passPOrtAuth(passport) {
    const params = {
        secretOrKey: process.env.ACCESSTOKENSECRET,
        jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken()
    }
    passport.use(
        new jwtStrategy(params,
            // if jwt token veries then it will come to below funtion
            async function (jwt_payload, cb) {
                const user = await UserTable.findOne({ mobile_number: jwt_payload.mobile_number })
                if (user) {
                    cb(null, true)
                } else {
                    cb(null, false)
                }
            }
        )
    )
}
module.exports = {
    passPOrtAuth
}