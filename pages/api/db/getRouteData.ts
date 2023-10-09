const getRouteData = async (req, res) => {
  const apiUrl = "https://api.mapbox.com/directions/v5/mapbox/driving-traffic";
  const token =
    "pk.eyJ1IjoiamRkYzEyIiwiYSI6ImNsZnQ5eTZ6azBkemEza3FybnJxd3N4dzYifQ.JJBeSwVQUysrfyXgjXpbSg";
  const mapBoxUrl = `${apiUrl}/${req.body.pickupCoordinates[0]},${req.body.pickupCoordinates[1]};${req.body.dropoffCoordinates[0]},${req.body.dropoffCoordinates[1]}?steps=true&geometries=geojson&access_token=${token}`;

  try {
    const response = await fetch(mapBoxUrl);
    const data = await response.json();
    console.log(data);

    res.status(200).send({ message: "success", data: data.routes[0] });
  } catch (err) {
    res.status(500).send({ message: "error", data: err.message });
  }
};

export default getRouteData;
