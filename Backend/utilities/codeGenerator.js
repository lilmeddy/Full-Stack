import * as crypto from "crypto"

const generateCode = () =>{
      const OTP = crypto.randomBytes(4);
      return OTP.toString('hex')
}

export {generateCode}