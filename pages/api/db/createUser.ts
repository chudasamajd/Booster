import { client } from "../../../lib/sanity";

const createUser = async (req, res) => {
  try {
    const userDoc = {
      _type: "users",
      _id: req.body.userWalletAddress,
      walletAddress: req.body.userWalletAddress,
    };

    await client.createIfNotExists(userDoc);

    res.status(200).send({ message: "success" });
  } catch (err) {
    res.status(500).send({ message: "error", data: err.message });
  }
};

export default createUser;
