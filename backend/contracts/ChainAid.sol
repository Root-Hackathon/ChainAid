// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "hardhat/console.sol";

contract ChainAid {
    address payable public owner;

    constructor() payable {
        owner = payable(msg.sender);
    }

    function isDeployer(address _address) public view returns (bool) {
        if (_address == owner) return true;
        else return false;
    }

    function changeDeployer(address _address) public {
        require(msg.sender == owner, "you are not the deployer");
        owner = payable(_address);
    }

    struct Org {
        uint256 id;
        string name;
        string email;
        string contactNo;
        address _orgAddress;
        uint256 balance;
        bool isVerified;
    }

    struct Member {
        uint256 id;
        string email;
        string contactNo;
        address _memberAddress;
        string[] skills;
    }

    uint public orgCount;
    uint public memberCount;

    mapping(address => Org) public Organization;
    mapping(address => bool) RegisteredOrganization;
    address[] allOrganizations;

    mapping(address => Member) Members;
    mapping(address => bool) RegisteredMember;
    address[] allMembers;

    function addOrg(
        string memory name,
        string memory email,
        string memory contactNo
    ) public payable {
        require(msg.value >= 1e17, "Error, deposit must be >= 10 MATIC");
        RegisteredOrganization[msg.sender] = true;
        orgCount++;
        Organization[msg.sender] = Org(
            orgCount,
            name,
            email,
            contactNo,
            msg.sender,
            msg.value,
            false
        );
        allOrganizations.push(msg.sender);
        console.log("Added org");
    }

    function getOrg(address _addr) public view returns (Org memory) {
        require(RegisteredOrganization[_addr], "No org found");
        return Organization[_addr];
    }

    function getAllOrgs() public view returns (Org[] memory) {
        require(owner == msg.sender);
        Org[] memory _allOrgs = new Org[](allOrganizations.length);

        for (uint i = 0; i < allOrganizations.length; i++) {
            _allOrgs[i] = Organization[allOrganizations[i]];
        }
        return _allOrgs;
    }

    function removeOrg(address _addr) public {
        require(msg.sender == owner, "you are not the deployer");
        require(RegisteredOrganization[_addr], "No org found");
        RegisteredOrganization[_addr] = false;

        uint len = allOrganizations.length;
        for (uint i = 0; i < len; i++) {
            if (allOrganizations[i] == _addr) {
                allOrganizations[i] = allOrganizations[len - 1];
                allOrganizations.pop();
                break;
            }
        }
    }

    function isOrganization(address _addr) public view returns (bool) {
        if (RegisteredOrganization[_addr]) return true;
        else return false;
    }

    function verifyOrganization(address _addr) public {
        require(msg.sender == owner, "you are not the deployer");
        require(RegisteredOrganization[_addr], "No org found");
        Organization[_addr].isVerified = true;
    }

    function registerMember(
        string memory name,
        string memory email,
        string memory contactNo,
        string[] memory skills
    ) public {
        require(!RegisteredMember[msg.sender]);
        RegisteredMember[msg.sender] = true;
        memberCount++;
        allMembers.push(msg.sender);
        Members[msg.sender] = Member(
            memberCount,
            email,
            contactNo,
            msg.sender,
            skills
        );
    }

    function payMember(address payable member) public {
        uint totalReward = 1e16;
        uint commission = (2 * totalReward) / 100;
        uint remainingReward = totalReward - commission;
        owner.transfer(commission);
        member.transfer(remainingReward);
    }
}
