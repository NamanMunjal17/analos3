// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;


contract Analos {
    mapping(address => string) public catalogue; 
    mapping(address => mapping(address => mapping(uint256 => uint256))) public requests;

    struct group {
        uint256 fee; 
        uint256 totalCollection;
        address owner;
        address[] members; 
        mapping(address => uint256) requests;
        string title; 
        string catalogue; 
    }
    group[] public groups;

    function makeG(string memory _title) public payable{

        group storage temp = groups.push();
        temp.fee = msg.value;
        temp.owner= msg.sender;
        temp.members = [msg.sender];
        temp.title = _title; 
        temp.totalCollection = msg.value;


    }
    function joinG(uint256 _gNumber)public payable{
        require(msg.value >=groups[_gNumber].fee);
        groups[_gNumber].totalCollection += msg.value;
        groups[_gNumber].members.push(msg.sender);
    }

    function changeCatalogue(uint256 _group, string memory _id, uint256 _isGroup) public {
        if(_isGroup == 0){
            catalogue[msg.sender] = _id;
        }else {
        
            for(uint i = 0; i <= groups[_group].members.length; i++){
                if(msg.sender == groups[_group].members[i]){
                    groups[_group].catalogue = _id;
                    break;
                }
            }
        }
    }
    function makeRequest(address _toAddress, uint256 _notesId, uint256 _isGroup, uint256 _group) public payable{
        if(_isGroup == 0){
            requests[_toAddress][msg.sender][_notesId] = msg.value;


        }else{
               for(uint i = 0; i <= groups[_group].members.length; i++){
                if(msg.sender == groups[_group].members[i]){
    
                    groups[_group].requests[_toAddress] += 1;
                    break;

                }
            }
            

        }
    }

    function acceptRequest(address _fromAddress,uint256 _notesId) public{
        if(requests[msg.sender][_fromAddress][_notesId] > 0){

            payable(msg.sender).transfer(requests[msg.sender][_fromAddress][_notesId]);
            delete requests[msg.sender][_fromAddress][_notesId];
        }
   



    }

     function endSubscription(uint256 _group)  public{
        require(msg.sender == groups[_group].owner);

        uint256 totalRequests = 0; 
        for(uint i = 0; i< groups[_group].members.length; i++){
            totalRequests += groups[_group].requests[groups[_group].members[i]]; // Adding the total requests for a community

        }
        for(uint i = 0; i< groups[_group].members.length; i++){
            uint256 contribution = groups[_group].requests[groups[_group].members[i]]; 
            if(contribution > 0){
            uint256 reward = (contribution * groups[_group].totalCollection)/totalRequests;
            payable(groups[_group].members[i]).transfer(reward);
            delete groups[_group];
            }
        
        }


    }


}