import crypto from 'crypto'
function generateSha512(str: any): string {
    return crypto.createHash('sha512').update(str).digest('hex');
}

function generateHash(params: any, salt: any): string {
    console.log(params , salt)
    let hashString = params["key"] + "|" + params["txnid"] + "|" + params["amount"] + "|" + params["productinfo"] + "|" + params["firstname"] + "|" + params["email"] + "||||||" + salt;
    //  const hashString = `${params.key}|${params.txnid}|${params.amount}|${params.productinfo}|${params.firstname}|${params.email}|||||SALT`
    return generateSha512(hashString);
}
export { generateSha512 , generateHash}