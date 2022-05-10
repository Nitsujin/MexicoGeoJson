# MexicoGeoJson
![image](https://user-images.githubusercontent.com/95154239/167545854-435768db-3dfd-46fe-a21b-c293317ce2e4.png)
<br />
This repository contains snippets of the code I used to create a polygon of each state in Mexico using geojson coordinates

### Built With


* [React.js](https://reactjs.org/)
* [React-Leaflet](https://react-leaflet.js.org/)

### Prerequisites

Install React-Leaflet

* yarn
  ```sh
  yarn add react-leaflet
  ```

<!-- ABOUT THE PROJECT -->
## About The Project

The purpose of rendering the map is to display election results across each state. Data for the GeoJson coordinates, individual state center coordinates, and election results are all stored within the database. It is retrieved initially when the page renders and are used to generate necessary cards and tables. 

![image](https://user-images.githubusercontent.com/95154239/167545898-3c5acc94-2509-48e3-834a-e44db7f0b7c6.png)

The individual cards that corresponds to a state's election result will be displayed whenever the user hovers within the dimensions of the state.

![image](https://user-images.githubusercontent.com/95154239/167546144-6b6e2edd-be1d-4f9f-a54c-69eac2e17a20.png)

All of the cards are also displayed within the page so the user can view all of the election details at once. The full details button will redirect the user to a state page that contains a much more in-depth information about the state elections.

![image](https://user-images.githubusercontent.com/95154239/167546240-961f88bb-b2df-46e6-9438-042d3d8badd7.png)




<!-- USAGE EXAMPLES -->
## Usage


For more examples, please refer to: 
https://react-leaflet.js.org/  
https://leafletjs.com/reference.html
https://github.com/PaulLeCam/react-leaflet



<!-- LICENSE -->
## License

Distributed under the GNU General Public License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>










