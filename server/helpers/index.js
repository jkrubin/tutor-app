module.exports = {
    tryStringify(obj){
        try{
            let res = typeof obj == 'object'? JSON.stringify(obj) : obj
            return res
        }catch(err){
            return obj
        }
    },
    generateCode(len=8){
        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
		let code = ''
		for(let i = 0; i < len; i++){
		    code += str.charAt(Math.floor(Math.random() * 62))
		}
		return code
    },
    parseJSON(json){
        try{
            let parsed = JSON.parse(json)
            return parsed
        }catch(err){
            return json
        }
    }
}