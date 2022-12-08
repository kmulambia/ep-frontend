// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
var CryptoJS = require("crypto-js");

export default class useCrypto {
    constructor() {
        this.key = 'my-secret-key@123';
    }
    encrypt(data) {
        return CryptoJS.AES.encrypt(JSON.stringify(data), this.key).toString();
    }
    decrypt(data) {
        if (data == null) {
            return null;
        }
        else {
            var bytes = CryptoJS.AES.decrypt(data, this.key);
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }

    }
}
