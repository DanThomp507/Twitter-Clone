const UserStorage = artifacts.require("UserStorage");
const UserController = artifacts.require('UserController');
const utils = require('../utils')
const { assertVMException } = utils

contract("users", () => {

  it('can create user with controller', async () => {
    const controller = await UserController.deployed()

    const username = web3.utils.fromAscii('daniel')
    const tx = await controller.createUser(username)
    assert.isOk(tx)
  })

  it('can not create user without controller', async () => {
    const storage = await UserStorage.deployed();


    try {
      const username = web3.utils.fromAscii('daniel')
      await storage.createUser(username);
      assert.fail()
    } catch (err) {
      assertVMException(err);
    }
  })
  // it('can create a user', async () => {
  //   const storage = await UserStorage.deployed();

  //   const username = web3.utils.fromAscii('daniel')
  //   const tx = await storage.createUser(username);

  //   assert.isOk(tx);
  // })

  it('can get a user', async () => {
    const storage = await UserStorage.deployed();
    const userId = 1;

    const userInfo = await storage.profiles.call(userId)
    const username = web3.utils.toAscii(userInfo[1]).replace(/\u0000/g, '');
    assert.equal(username, 'daniel');
  })
})