import { client } from "../../../lib/sanity";

const query = `
*[_type=="rides"]{
    "service": title,
      "iconURL": iconUrl,
      model,
      maxSpeed,
      rating,
      weight,
      Battery,
      priceMultiplier,
     orderById   
  }|order(orderById asc)
`;

const getRideTypes = async (req, res) => {
  try {
    const sanityResponse = await client.fetch(query);
    res.status(200).send({ message: "success", data: sanityResponse });
  } catch (err) {
    res.status(500).send({ message: "error", data: err.message });
  }
};

export default getRideTypes;
