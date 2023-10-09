const getLocationCoordinates = async (req, res) => {
  const apiUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places";
  const token =
    "pk.eyJ1IjoiamRkYzEyIiwiYSI6ImNsZnQ5eTZ6azBkemEza3FybnJxd3N4dzYifQ.JJBeSwVQUysrfyXgjXpbSg";
  const mapBoxUrl = `${apiUrl}/${req.body.location}.json?access_token=${token}`;

  try {
    const response = await fetch(mapBoxUrl);
    const data = await response.json();
    res.status(200).send({ message: "success", data: data.features[0].center });
  } catch (err) {
    res.status(500).send({ message: "error", data: err.message });
  }
};

export default getLocationCoordinates;
