var Web3 = require('web3');
var provider_file = require('../utils/provider');
var abis = require('../utils/abis');
var addresses = require('../utils/addresses')


const Clarity = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SL1", "SL2", "SL3", "P1", "P2", "P3"]
const Colour = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"]
const Cut = ["Excellent", "Very_good", "good", "fair", "poor"]
const Source = ["South_Africa", "Zimbabwe", "Botswana", "Angola", "Namibia", "Congo", "Russia", "Australia", "Canada"]
const Shape = ["Circle", "Square", "Heart", "Pear", "Oval", "Marquise", "Emerald"]

const chain = 'sepolia'
let web3 = new Web3(new Web3.providers.WebsocketProvider(provider_file[chain]));
var diamond_query = new web3.eth.Contract(abis['DIAMOND'], addresses['test_diamond'])
var contract = new web3.eth.Contract(abis['DIAMOND'], addresses['test_diamond']);


async function read_mining_company(){
    let result = await diamond_query.methods.get_mining_company().call()
    return result
}

async function read_cutting_company(){
    let result = await diamond_query.methods.get_cutting_company().call()
    return result
}

async function read_grading_company(){
    let result = await diamond_query.methods.get_grading_company().call()
    return result
}

async function read_mining_company_name(address){
    let result = await diamond_query.methods.get_mining_company_name(address).call()
    return result
}

async function read_cutting_company_name(address){
    let result = await diamond_query.methods.get_cutting_company_name(address).call()
    return result
}

async function read_grading_company_name(address){
    let result = await diamond_query.methods.get_grading_company_name(address).call()
    return result
}

async function read_diamond(id){
    let result = await diamond_query.methods.get_diamond(id).call()
    let wrapped_result = {}
    wrapped_result['unique_id'] = parseInt(result['diamond_id'])
    wrapped_result['cut_id'] = parseInt(result['raw_cutting_id'])
    wrapped_result['raw_id'] = parseInt(result['raw_diamond_id'])
    wrapped_result['graded_company'] = result['company_name']
    wrapped_result['graded_company_address'] = result['graded_company']
    wrapped_result['graded_time'] = timestamp_to_str(parseInt(result['timestamp']))
    wrapped_result['clarity'] = Clarity[parseInt(result['clarity'])]
    wrapped_result['cut'] = Cut[parseInt(result['cut'])]
    wrapped_result['colour'] = Colour[parseInt(result['colour'])]
    wrapped_result['carat'] = parseInt(result['carat'])

    // cutting_information

    wrapped_result['cut_time'] = timestamp_to_str(parseInt(result['raw_cutting_information']['timestamp']))
    wrapped_result['cut_company'] = result['raw_cutting_information']['company_name']
    wrapped_result['cut_company_address'] = result['raw_cutting_information']['cutted_company']
    wrapped_result['shape'] = Shape[parseInt(result['raw_cutting_information']['shape'])]

    // raw_information

    wrapped_result['mine_time'] = timestamp_to_str(parseInt(result['raw_cutting_information']['raw_diamond_information']['timestamp']))
    wrapped_result['mined_company'] = result['raw_cutting_information']['raw_diamond_information']['company_name']
    wrapped_result['mined_company_address'] = result['raw_cutting_information']['raw_diamond_information']['mined_company']
    wrapped_result['source'] = Source[parseInt(result['raw_cutting_information']['raw_diamond_information']['source'])]
    return wrapped_result
}

async function read_raw_cutted_diamond(id){
    let result = await diamond_query.methods.get_raw_cutting_diamond(id).call()
    let wrapped_result = {}
    
    // cutting_information
    wrapped_result['cut_id'] = parseInt(result['raw_cutting_id'])
    wrapped_result['raw_id'] = parseInt(result['raw_diamond_id'])
    wrapped_result['cut_time'] = timestamp_to_str(parseInt(result['timestamp']))
    wrapped_result['cut_company'] = result['company_name']
    wrapped_result['cut_company_address'] = result['cutted_company']
    wrapped_result['shape'] = Shape[parseInt(result['shape'])]

    // raw_information
    wrapped_result['mine_time'] = timestamp_to_str(parseInt(result['raw_diamond_information']['timestamp']))
    wrapped_result['mined_company'] = result['raw_diamond_information']['company_name']
    wrapped_result['mined_company_address'] = result['raw_diamond_information']['mined_company']
    wrapped_result['source'] = Source[parseInt(result['raw_diamond_information']['source'])]
    return wrapped_result
}

async function read_raw_diamond(id){
    let result = await diamond_query.methods.get_raw_diamond(id).call()
    let wrapped_result = {}
    wrapped_result['raw_id'] = parseInt(result['raw_diamond_id'])
    wrapped_result['mine_time'] = timestamp_to_str(parseInt(result['timestamp']))
    wrapped_result['mined_company'] = result['company_name']
    wrapped_result['mined_company_address'] = result['mined_company']
    wrapped_result['source'] = Source[parseInt(result['source'])]
    return wrapped_result
}

async function add_mining_company(user_address, company_address, company_name){
    try{
        const response = await contract.methods
        .mining_company_registry(company_address, company_name)
        .send({ from: user_address });
        console.log(response);
    }
    catch (error) {
        console.log(error);
      }
}

async function add_cutting_company(user_address, company_address, company_name){
    try{
        const response = await contract.methods
        .cutting_company_registry(company_address, company_name)
        .send({ from: user_address });
        console.log(response);
    }
    catch (error) {
        console.log(error);
      }
}

async function add_grading_company(user_address, company_address, company_name){
    try{
        const response = await contract.methods
        .grading_company_registry(company_address, company_name)
        .send({ from: user_address });
    
        console.log(response);
    }
    catch (error) {
        console.log(error);
      }
}

async function mine(user_address, source){
    try{
        const response = await contract.methods
        .mining(source).send({ from: user_address });
    
        console.log(response);
    }
    catch (error) {
        console.log(error);
      }
}

async function cut(user_address, raw_id, shape){
    try{
        const response = await contract.methods.cutting(raw_id, shape).send({ from: user_address });
        console.log(response);
    }
    catch (error) {
        console.error(error);
      }
}

async function grade(user_address, raw_cutting_id, carat, clarity, colour, cut){
    try{
        const response = await contract.methods
        .grading(raw_cutting_id, carat, clarity, colour, cut).send({ from: user_address });

        console.log(response);
    }
    catch (error) {
        console.log(error);
      }
}


function timestamp_to_str(timestamp){
    var date = new Date(timestamp * 1000);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds();
    return (Y+M+D+h+m+s);
}

module.exports = {read_mining_company, read_cutting_company, read_grading_company, 
    read_raw_diamond, read_diamond, read_raw_cutted_diamond, add_mining_company, 
    add_cutting_company, add_grading_company, mine, cut, grade, read_mining_company_name, 
    read_cutting_company_name, read_grading_company_name}


