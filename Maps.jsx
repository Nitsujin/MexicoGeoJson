import React, { useEffect, useState, useCallback } from "react";
import { MapContainer, GeoJSON, Tooltip, CircleMarker } from "react-leaflet";
import "./style.css";
import "leaflet/dist/leaflet.css";
import * as mapsService from "../../services/mapsService";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";
function Maps() {
  useEffect(() => {
    mapsService.getAll().then(onGetAllStatesSuccess).catch(onGetAllStatesError);
  }, []);

  const [pageStateData, setPageStateData] = useState([]);

  const center = [25.380002, -102.134007];

  const [baseStateConfig] = useState({
    color: "#666666",
    fillColor: "#4e4d52",
    weight: 1,
  });

  const navigate = useNavigate();

  const onGetAllStatesSuccess = (response) => {
    let data = response.item;
    const stateData = JSON.parse(data);

    setPageStateData((prevState) => {
      let newState = { ...prevState };
      newState = stateData;
      return newState;
    });
  };

  const onGetAllStatesError = (response) => {
    toastr.error(response);
  };

  const highlightLines = (e) => {
    const layer = e.target;
    layer.setStyle({
      weight: 4,
    });
  };

  const reset = (e) => {
    const layer = e.target;
    layer.setStyle(baseStateConfig);
  };

  const onEachFeatureConfig = useCallback((feature, layer) => {
    layer.on({
      mouseover: highlightLines,
      mouseout: reset,
    });
  });

  const fullDetailsClick = (e) => {
    const targetId = e.currentTarget.id;
    navigate(`/state?id=${targetId}`);
  };
  const mapPolygon = (locationData) => (
    <GeoJSON
      key={"State:" + locationData.properties.name}
      id={locationData.properties.id}
      data={locationData.geometry}
      style={baseStateConfig}
      onEachFeature={onEachFeatureConfig}
    >
      <Tooltip
        key={`RegionCode: ${locationData.properties.name}`}
        direction={"auto"}
        sticky={true}
        className="tooltip row-cols-xxl-auto"
        opacity={1}
      >
        {mapElectionCards(locationData)}
      </Tooltip>

      <CircleMarker
        center={[locationData.properties.cLat, locationData.properties.cLng]}
        pathOptions={baseStateConfig}
        radius={1}
      >
        <Tooltip
          key={`Region: ${locationData.properties.code}`}
          permanent
          className="bg-transparent border-0 shadow"
          direction={"center"}
        >
          <strong>{locationData.properties.code}</strong>
        </Tooltip>
      </CircleMarker>
    </GeoJSON>
  );

  const mapElectionCards = (data) => {
    if (data.properties.results) {
      //retrieve the top two candidates by vote
      const topTwo = data.properties.results.slice(0, 2);
      return (
        <Card
          key={`State:${data.properties.id}${data.properties.name}`}
          className="col-lg-5 mx-lg-2"
          style={
            data.properties.results && {
              borderTop: `30px solid ${data.properties.results[0].partyColor}`,
            }
          }
        >
          <Card.Header>
            <h3>{data.properties.name}</h3>
          </Card.Header>
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
              <tbody>{topTwo?.map(mapCandidate)}</tbody>
            </Table>
          </Card.Body>{" "}
          <Card.Footer className="text-lg-end footerButton">
            <Button
              type="button"
              className="btn btn-primary"
              onClick={fullDetailsClick}
              id={data.properties.id}
            >
              Full details
            </Button>
          </Card.Footer>
        </Card>
      );
    }
  };
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
      <div className="my-4 py-5 page-bg divider">
        <MapContainer
          center={center}
          zoom={5}
          id="mexicoMap"
          zoomControl={false}
          dragging={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
        >
          <Container>
            <Row className="py-4">
              <Col>
                <h1 className="text-center">Map of Mexico</h1>
              </Col>
            </Row>
          </Container>
          {pageStateData && pageStateData.map(mapPolygon)}
        </MapContainer>
      </div>
      <Row className="text-center my-3">
        <div>
          {" "}
          <h1>{`State Results`}</h1>
        </div>
      </Row>
      <Row className="justify-content-center my-4">
        {pageStateData?.map(mapElectionCards)}
      </Row>
    </React.Fragment>
  );
}

export default Maps;
