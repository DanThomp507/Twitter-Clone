// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../../contracts/tweets/TweetStorage.sol";

contract TestTweetStorage {
    TweetStorage tweetStorage;

    constructor() {
        tweetStorage = new TweetStorage();
        tweetStorage.setControllerAddr(address(this));
    }

    function testCreateTweet() public {
        uint256 _userId = 1;
        uint256 _expectedTweetId = 1;

        Assert.equal(
            tweetStorage.createTweet(_userId, "Hello World!"),
            _expectedTweetId,
            "Should create tweet with ID as 1"
        );
    }
}
