// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Jewelary{

    address payable private jewelary_maker;
    address public diamond;
    uint256 private total_supply;
    enum Jewelary_type {Ring, Necklace, Earring, Bracelet, Brooche, Watch}
    // ENCHANTED
    // DEWDROP
    // AURATOI
    // AZULIA
    // https://ipfs.io/ipfs/QmesubygLVEKZbfXty7uFMtrwJsVTz7FdVjaJrWqcKLYeZ?filename=R102176_01.jpg
    // https://ipfs.io/ipfs/Qmep6wXbW82bsbGrRzUZN1sY3DC2wCTVqyLeHqXQNAaJRM?filename=E102138_01.jpg
    // https://ipfs.io/ipfs/Qme2Je2kJiCHvwdGCHkiNReXDGkqqzmZ28QgGr7aFLphdY?filename=R102218_01.jpg
    // https://ipfs.io/ipfs/QmR4KgATYxv5PBs4MX9TbEFTDnt5DDQyN2JJcZ7V9c6hjv?filename=N102231_01.jpg
    

    struct jewelary{
        uint256 unique_id;
        string name;
        uint256 diamond_id;
        uint256 price;    
        Jewelary_type jewelary_type;
        string photo;
    }


    constructor() {
        jewelary_maker = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == jewelary_maker, "Caller is not owner");
        _;
    }

    mapping(uint256 => address) private _token_holder;
    mapping(address => uint256[]) private _holder_token;
    mapping(uint256 => address) private _token_approvals;
    mapping(uint256 => jewelary) private _jewelary_info;


    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);

    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    function remove(uint256 factor, uint256[] storage arr) internal returns(uint256[] storage){
        uint256 _index;
        for(uint256 i = 0; i < arr.length; i++){
            if (arr[i] == factor){
                _index = i;
                break;
            }
        }
        for(uint i = _index; i < arr.length - 1; i++){            
            arr[i] = arr[i + 1];
        }
        arr.pop();
        return arr;
    }


    function balanceOf(address owner) public view returns (uint256) {
        require(owner != address(0), "ERC721: balance query for the zero address");
        require(msg.sender == owner, " Only owner can read the balance");
        return _holder_token[owner].length;
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        require(_token_holder[tokenId] != address(0),  "owner query for nonexistent token");
        return _token_holder[tokenId];
    }

    function transfer(address from, address to, uint256 tokenId) public {
        require(ownerOf(tokenId) == from, " transfer of token that is not own"); // internal owner
        require(to != address(0), " transfer to the zero address");
        _transfer(from, to, tokenId);

    }

    function transfer_from(address from, address to, uint256 tokenId) public {
        require(_token_approvals[tokenId] == to, "not the approval transfer");
        _transfer(from, to, tokenId);
    }


    function _transfer(address from, address to, uint256 tokenId) internal{
        _holder_token[from] = remove(tokenId, _holder_token[from]);
        _holder_token[to].push(tokenId);
        _token_holder[tokenId] = to;
        emit Transfer(from, to, tokenId);
    }


    function manufactur_jewelary(uint256 diamond_id, string memory name, uint256 price, Jewelary_type jewelary_type, string memory photo) external onlyOwner{
        uint256 unique_id = total_supply + 1;
        jewelary memory temp_jewelary;
        temp_jewelary.unique_id = unique_id;
        temp_jewelary.name = name;
        temp_jewelary.price = price;
        temp_jewelary.diamond_id = diamond_id;
        temp_jewelary.jewelary_type = jewelary_type;
        temp_jewelary.photo = photo;
        _jewelary_info[unique_id] = temp_jewelary;
        set_holder(msg.sender, unique_id);
        total_supply = total_supply + 1;
    }

    function set_price(uint256 tokenId, uint256 price) public{
        require(msg.sender == ownerOf(tokenId), "not the owner");
        _jewelary_info[tokenId].price = price;
    }

    function set_holder(address holder, uint256 tokenId) public onlyOwner{
        require(_token_holder[tokenId] == address(0), "no need to set holder");
        _token_holder[tokenId] = holder;
        _holder_token[holder].push(tokenId);
    }

    function approve(address to, uint256 tokenId) public {
        address owner = ownerOf(tokenId);
        require(to != owner, "approval to current owner");
        require(msg.sender == owner, "approve caller is not owner nor approved for all");
        _token_approvals[tokenId] = to;
    }

    function buy_jewelary_from_manufacturer(uint256 unique_id) public payable {
        require(msg.value == _jewelary_info[unique_id].price, "wrong price");
        require(ownerOf(unique_id)  == jewelary_maker, "holder is not jewelary maker");
        transfer(_token_holder[unique_id], msg.sender, unique_id);
    }

    function sell_jewelary_to_manufacturer(uint256 unique_id) public payable{
        require(ownerOf(unique_id) == msg.sender, "not the holder");
        require(_token_approvals[unique_id] == jewelary_maker);
        transfer_from(msg.sender, jewelary_maker, unique_id);
        payable (msg.sender).transfer(_jewelary_info[unique_id].price);
    }

    function withdraw() external onlyOwner{
        jewelary_maker.transfer(address(this).balance);
    }

    function get_jewelary(uint256 id) external view returns(jewelary memory){
        require(ownerOf(id) == msg.sender || ownerOf(id) == jewelary_maker, "not the owner");
        return _jewelary_info[id];
    }

    function get_holds_jewelary(address holder) external view returns(uint256[] memory){
        require(msg.sender == holder, " Only owner can read the balance");
        return _holder_token[holder];
    }

    function get_owner() external view returns(address){
        return jewelary_maker;
    }

    function get_approve(uint256 id) external view returns(address){
        require(id > 0 && id <= total_supply, "no this jewelary");
        return _token_approvals[id];
    }

    receive() external payable{}

    fallback() external payable{}
}
