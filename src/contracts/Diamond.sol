// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Diamond{

    address[] public mining_company; // Alrosa, DeBeers, RioTinto, 
    address[] public cutting_company; // HarryWinston, Graff, Lazare
    address[] public grading_company; // GIA, IGI, AGSL
    address public owner;

    uint256 public raw_total_supply = 0;
    uint256 public raw_cutting_supply = 0;
    uint256 public total_supply = 0;

    enum Clarity{FL, IF, VVS1, VVS2, VS1, VS2, SL1, SL2, SL3, P1, P2, P3}
    enum Colour {D, E, F, G, H, I, J, K, L, M, N}
    enum Cut{Excellent, Very_good, good, fair, poor}
    enum Source{South_Africa, Zimbabwe, Botswana, Angola, Namibia, Congo, Russia, Australia, Canada}
    enum Shape{Circle, Square, Heart, Pear, Oval, Marquise, Emerald}


    struct raw_diamond{
        uint256 raw_diamond_id;
        uint256 timestamp;
        address mined_company;
        string company_name;
        Source source;
    }

    struct raw_cutting_diamond{
        uint256 raw_diamond_id;
        uint256 raw_cutting_diamond_id;
        uint256 timestamp;
        address cutted_company;
        string company_name;
        Shape shape; 
        raw_diamond raw_diamond_information;
    }

    struct diamond{
        uint256 diamond_id;
        uint256 timestamp;
        address graded_company;
        uint256 raw_diamond_id;
        uint256 raw_cutting_id;
        string company_name;
        raw_cutting_diamond raw_cutting_information;
        Clarity clarity;
        Colour colour;
        Cut cut;
        uint carat;
    }

    mapping(uint256 => diamond) diamond_dict;
    mapping(uint256 => raw_diamond) raw_diamond_dict;
    mapping(uint256 => raw_cutting_diamond) raw_cutting_diamond_dict;
    mapping(uint256 => address) diamond_owner_dict;
    mapping(address => string) mining_company_dict;
    mapping(address => string) cutting_company_dict;
    mapping(address => string) grading_company_dict;

    
    function is_address_in_list(address temp_address, address[] memory temp_address_list) internal pure returns(bool){
        for(uint i = 0; i < temp_address_list.length; i++){
            if (temp_address == temp_address_list[i]){
                return true;
            }
        }
        return false;
    }

    
    modifier onlyMiner(){
        require(is_address_in_list(msg.sender, mining_company) == true, "not the miner");
        _;
    }

    modifier onlyCutter(){
        require(is_address_in_list(msg.sender, cutting_company) == true, "not the cutter");
        _;
    }

    modifier onlyGrader(){
        require(is_address_in_list(msg.sender, grading_company) == true, "not the grader");
        _;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "not the owner");
        _;
    }

    constructor(){
        owner = msg.sender;
    }


    function mining_company_registry(address company, string memory name) external onlyOwner{
        require(is_address_in_list(company, mining_company) == false, "already in the list");
        mining_company.push(company);
        mining_company_dict[msg.sender] = name;
    }

    function cutting_company_registry(address company, string memory name) external onlyOwner{
        require(is_address_in_list(company, cutting_company) == false, "already in the list");
        cutting_company.push(company);
        cutting_company_dict[msg.sender] = name;
    }

    function grading_company_registry(address company, string memory name) external onlyOwner{
        require(is_address_in_list(company, grading_company) == false, "already in the list");
        grading_company.push(company);
        grading_company_dict[msg.sender] = name;
    }

    function mining(Source source) external onlyMiner{
        uint256 raw_diamond_id = raw_total_supply + 1;
        raw_diamond memory temp_diamond;
        temp_diamond.mined_company = msg.sender; 
        temp_diamond.company_name = mining_company_dict[msg.sender];
        temp_diamond.timestamp = block.timestamp;
        temp_diamond.raw_diamond_id = raw_diamond_id;
        temp_diamond.source = source;
        raw_diamond_dict[raw_diamond_id] = temp_diamond;
        raw_total_supply = raw_total_supply + 1;
    }

    function cutting(uint256 raw_diamond_id, Shape shape) 
        external onlyCutter {
        raw_cutting_diamond memory temp_dict;
        temp_dict.timestamp = block.timestamp;
        temp_dict.cutted_company = msg.sender;
        temp_dict.company_name = cutting_company_dict[msg.sender];
        temp_dict.raw_cutting_diamond_id = raw_cutting_supply + 1;
        temp_dict.shape = shape;
        temp_dict.raw_diamond_information = raw_diamond_dict[raw_diamond_id];
        raw_cutting_diamond_dict[raw_cutting_supply + 1] =  temp_dict;
        raw_cutting_supply = raw_cutting_supply + 1;
        
    }

    function grading(uint256 raw_cutting_id, uint carat, Clarity clarity, Colour colour, Cut cut)
        external onlyGrader{
        uint256 diamond_id = total_supply + 1;
        diamond memory temp_diamond;
        temp_diamond.diamond_id = diamond_id;
        temp_diamond.timestamp = block.timestamp;
        temp_diamond.graded_company = msg.sender;
        temp_diamond.company_name = grading_company_dict[msg.sender];
        temp_diamond.raw_cutting_information = raw_cutting_diamond_dict[raw_cutting_id];
        temp_diamond.carat = carat;
        temp_diamond.clarity = clarity;
        temp_diamond.colour = colour;
        temp_diamond.cut = cut;
        temp_diamond.raw_cutting_id = raw_cutting_id;
        temp_diamond.raw_diamond_id = temp_diamond.raw_cutting_information.raw_diamond_id;
        diamond_dict[diamond_id] = temp_diamond;
        total_supply += 1;
    }

    function get_mining_company() external view returns(address[] memory){
        return mining_company;
    }

    function get_cutting_company() external view returns(address[] memory){
        return cutting_company;
    }

    function get_grading_company() external view returns(address[] memory){
        return grading_company;
    }

    function get_raw_diamond(uint256 raw_id) external view returns(raw_diamond memory){
        require(raw_id > 0 && raw_id <= raw_total_supply, "No such raw diamond");
        return raw_diamond_dict[raw_id];
    }

    function get_raw_cutting_diamond(uint256 raw_id) external view returns(raw_cutting_diamond memory){
        require(raw_id > 0 && raw_id <= raw_cutting_supply, "No such raw cutted diamond");
        return raw_cutting_diamond_dict[raw_id];
    }

    function get_diamond(uint256 unique_id) external view returns(diamond memory){
        require(unique_id > 0 && unique_id <= total_supply, "No such graded diamond");
        return diamond_dict[unique_id];
    }

    function get_mining_company_name(address mining_company_address) external view returns(string memory){
        require(is_address_in_list(mining_company_address, mining_company) == true, "no such company");
        return mining_company_dict[mining_company_address];
    }

    function get_cutting_company_name(address cutting_company_address) external view returns(string memory){
        require(is_address_in_list(cutting_company_address, mining_company) == true, "no such company");
        return mining_company_dict[cutting_company_address];
    }

    function get_grading_company_name(address grading_company_address) external view returns(string memory){
        require(is_address_in_list(grading_company_address, mining_company) == true, "no such company");
        return mining_company_dict[grading_company_address];
    }
}