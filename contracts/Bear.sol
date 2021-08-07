pragma solidity >=0.4.21 <0.7.0;

// Stores the name of the current bear
contract Bear {
    bytes32 name;

    event NameChanged(bytes32 name);

    function set(bytes32 _name) public {
        name = _name;
        emit NameChanged(_name);
    }
}
