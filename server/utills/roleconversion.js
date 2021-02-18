const utils = {}

utils.convertroletorolecode = (role)=>{
    if(role === 'user') return 1;
    else if(role === 'admin') return 2;
}

module.exports = utils