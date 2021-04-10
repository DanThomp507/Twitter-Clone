const TweetStorage = artifacts.require('TweetStorage');
const TweetController = artifacts.require('TweetController');
const utils = require('../utils')
const { assertVMException } = utils

contract('tweets', () => {

  // before(async () => {
  //   const tweetStorage = await TweetStorage.deployed()
  //   await tweetStorage.createTweet(1, "Hello World!")
  // })

  it("can create tweet with controller", async () => {
    const controller = await TweetController.deployed()

    const tx = await controller.createTweet(1, "Hello World!")

    assert.isOk(tx)
  })

  it("can't create tweet without controller", async () => {
    const storage = await TweetStorage.deployed()

    try {
      const tx = await storage.createTweet(1, "Daniel")
      assert.fail();
    } catch (err) {
      assertVMException(err);
    }
  })

  it("can get tweet", async () => {
    const storage = await TweetStorage.deployed()

    // get the data
    const tweet = await storage.tweets.call(1)
    // destructure the data
    const { id, text, userId } = tweet

    // check if the tweet data contains the expected values
    assert.equal(parseInt(id), 1)
    assert.equal(text, "Hello World!")
    assert.equal(parseInt(userId), 1)
  })
})