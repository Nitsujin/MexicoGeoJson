import React, { useEffect, useState } from "react";
import { Card, Col, Row, Table, Container } from "react-bootstrap";
import { MapContainer, GeoJSON } from "react-leaflet";
import "./style.css";
import "leaflet/dist/leaflet.css";
import * as mapsService from "../../services/mapsService";
import { useSearchParams, useNavigate } from "react-router-dom";

function State() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const target = searchParams.get("id");
    mapsService.getById(target).then(onGetIdSuccess).catch(onGetIdError);
  }, []);
  const navigate = useNavigate();
  const [center, setCenter] = useState([]);
  const [data, setData] = useState({});

  const onGetIdSuccess = (response) => {
    const [retrievedData] = JSON.parse(response.item);
    setData((prevState) => {
      let newItem = { ...prevState };
      newItem = retrievedData;
      return newItem;
    });
    setCenter(() => {
      let lat = retrievedData.properties.cLat;
      let lng = retrievedData.properties.cLng;
      return [lat, lng];
    });
  };

  const onGetIdError = () => {
    navigate("/error-500");
  };

  const config = () => baseConfig;

  const [baseConfig] = useState({
    color: "#666666",
    fillColor: "#4e4d52",
    weight: 1,
  });

  const mapCandidate = (candidate) => (
    <tr key={`${candidate.id}`}>
      <td>
        <svg height="10" width="10" className="mx-1">
          <circle cx="5" cy="5" r="5" fill={`${candidate.partyColor}`} />
        </svg>
        {candidate.firstName} {candidate.lastName}
      </td>
      <td>{candidate.votes}</td>
      <td>{candidate.resultPercentage}</td>
    </tr>
  );
  return (
    <React.Fragment>
      {data.properties && center.length > 0 && (
        <div className="my-4">
          <Container>
            <div className="text-center my-4">
              <h1>{data.properties.name}</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Bibendum at varius vel pharetra vel turpis. Integer quis auctor
                elit sed vulputate. Purus non enim praesent elementum facilisis
                leo vel fringilla est. Auctor augue mauris augue neque gravida
                in fermentum et. Tempus egestas sed sed risus pretium quam
                vulputate. Commodo viverra maecenas accumsan lacus vel.
                Consectetur adipiscing elit ut aliquam. Urna molestie at
                elementum eu facilisis sed odio. Tortor condimentum lacinia quis
                vel eros donec ac odio tempor. Etiam non quam lacus suspendisse.
                Rutrum tellus pellentesque eu tincidunt.
              </p>
            </div>
          </Container>
          <Card
            style={
              data.properties.results && {
                borderTop: `thick solid ${data.properties.results[0].partyColor}`,
              }
            }
          >
            <Card.Header>
              <div>
                <h2>{`Governor Election Result`}</h2>
              </div>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col className="border-end">
                  <Card.Body>
                    {" "}
                    <Table>
                      <thead>
                        <tr>
                          <th>Candidate</th>
                          <th>Votes</th>
                          <th>Vote Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.properties.results?.map(mapCandidate)}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Col>

                <Col>
                  <MapContainer
                    center={center && center}
                    zoom={6}
                    id="stateMap"
                    dragging={false}
                    zoomControl={false}
                    scrollWheelZoom={false}
                    doubleClickZoom={false}
                  >
                    <div className="text-center my-4">
                      <h3>{data.properties?.name}</h3>
                    </div>
                    <GeoJSON
                      key={"State:" + data.properties?.id}
                      id={data.properties?.id}
                      data={data?.geometry}
                      style={config}
                    ></GeoJSON>
                  </MapContainer>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      )}
    </React.Fragment>
  );
}

export default State;
