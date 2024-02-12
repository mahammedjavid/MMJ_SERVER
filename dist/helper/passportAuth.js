"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passPOrtAuth = void 0;
const passport_jwt_1 = require("passport-jwt");
const index_1 = require("../relation/index");
function passPOrtAuth(passport) {
    const params = {
        secretOrKey: process.env.ACCESSTOKENSECRET,
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    };
    passport.use(new passport_jwt_1.Strategy(params, async (jwt_payload, done) => {
        try {
            const user = await index_1.UserTable.findOne({
                where: { mobile_number: jwt_payload.mobile_number },
            });
            if (user) {
                done(null, user);
            }
            else {
                done(null, false);
            }
        }
        catch (error) {
            done(error, false);
        }
    }));
}
exports.passPOrtAuth = passPOrtAuth;
