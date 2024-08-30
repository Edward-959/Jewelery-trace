var Web3 = require('web3');
var provider_file = require('../utils/provider');
var BN = require('ethers').BigNumber
var abis = require('../utils/abis');
var addresses = require('../utils/addresses');

const Jewelary_type = ["Ring", "Necklace", "Earring", "Bracelet", "Brooche", "Watch"]
const chain = 'sepolia'
let web3 = new Web3(new Web3.providers.WebsocketProvider(provider_file[chain]));
var jewelary_query = new web3.eth.Contract(abis['JEWELARY'], addresses['test_jewelary'])

async function get_jewelary(id){
    let result = await jewelary_query.methods.get_jewelary(id).call()
    let wrapped_result = {}
    wrapped_result['unique_id'] = result['unique_id']
    wrapped_result['diamond_id'] = result['diamond_id']
    wrapped_result['price'] = (BN.from(result['price']).mul(BN.from(100)).div(BN.from('1000000000000000000'))).toNumber() / 100
    wrapped_result['holder'] = result['holder']
    wrapped_result['jewelery_type'] = Jewelary_type[parseInt(result['jewelary_type'])]
    wrapped_result['photo_address'] = result['photo']
    return wrapped_result
}

async function buy_jewelary(id, user_address){
    try{
        const response = await jewelary_query.methods
        .buy_jewelary_from_manufacturer(id)
        .send({ from: user_address });
        console.log(response);
    }
    catch (error) {
        console.log('交易失败：' + error.message);
    }
}

async function manufacture_jewelary(diamond_id, price, jewelary_type, photo, user_address){
    try{
        const response = await jewelary_query.methods
        .manufacture_jewelary(diamond_id, price, jewelary_type, photo)
        .send({ from: user_address });
        console.log(response);
    }
    catch (error) {
        console.log('交易失败：' + error.message);
    }
}

async function sell_jewelary(id, user_address){
    try{
        const response = await jewelary_query.methods
        .sell_jewelary_to_manufacturer(id)
        .send({ from: user_address });
        console.log(response);
    }
    catch (error) {
        console.log('交易失败：' + error.message);
    }
}

async function get_holds_jewelary(address){
    let result = await jewelary_query.methods.get_holds_jewelary(address).call()
    return result
}

// (async() =>{
//     const userAddress = '0xcBF3248fd4480503CA67E36425cc75f186eEc8b4'; 
//     let result = await get_holds_jewelary(userAddress)
//     console.log(result)
// })()

module.exports = {get_jewelary, buy_jewelary, manufacture_jewelary, sell_jewelary, get_holds_jewelary};