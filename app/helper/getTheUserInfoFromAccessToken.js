const jwt = require('jsonwebtoken');
function getTheUserInfoFromJwt(req) {
    try {
        if (req?.headers?.authorization) {
            const accessToken = req?.headers?.authorization?.split(' ')[1]; // Assuming the token is in the "Authorization" header
            const decodedToken = jwt.decode(accessToken);
            return decodedToken
        }
        return null
    } catch (error) {
        throw error
    }
}
module.exports = { getTheUserInfoFromJwt }