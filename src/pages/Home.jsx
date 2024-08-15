import React, { useState, useRef, useEffect } from 'react';
import { MantineProvider, createTheme, Checkbox, Select } from '@mantine/core';
import "./Home.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const baseUrl = 'http://localhost:4443/api'; // Змініть це на адресу вашого сервера

export const getPostBranches = async () => {
  try {
    const response = await fetch('http://localhost:4443/api/PostBranch', {
      headers: {
        Accept: 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch post branches');
    }

    const data = await response.json();

    return data.map(branch => ({
      name: branch.localAddress,
      coordinates: [branch.x, branch.y] // Поміняємо координати місцями
    }));
  } catch (error) {
    console.error('Error fetching post branches:', error);
    throw error;
  }
};

export const getParcelMachines = async () => {
  try {
    const response = await fetch('http://localhost:4443/api/ParcelMachine', {
      headers: {
        Accept: 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch parcel machines');
    }

    const data = await response.json();

    return data.map(machine => ({
      name: machine.localAddress,
      coordinates: [machine.x, machine.y]
    }));
  } catch (error) {
    console.error('Error fetching parcel machines:', error);
    throw error;
  }
};

const Home = () => {
  const [showPostamats, setShowPostamats] = useState(false);
  const [showDepartments, setShowDepartments] = useState(true);

  const [locations, setLocations] = useState([]);
  const [parcelMachines, setParcelMachines] = useState([]);

  const [initialCoordinates, setInitialCoordinates] = useState([49.6, 30.7]);
  const [zoom, setZoom] = useState(7);

  const mapRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const allLocations = [
    ...(showPostamats ? parcelMachines : []),
    ...(showDepartments ? locations : [])
  ];

  const customMarkerIcon = new L.Icon({
    iconUrl: 'location-100.png',
    iconSize: [32, 32], // size of the icon
    iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -32], // point from which the popup should open relative to the iconAnchor
  });

  const postamatMarkerIcon = new L.Icon({
    iconUrl: 'mailbox-100.png',
    iconSize: [32, 32], 
    iconAnchor: [16, 32], 
    popupAnchor: [0, -32], 
  });

  const theme = createTheme({
    cursorType: 'pointer',
  });

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const branches = await getPostBranches();
        setLocations(branches);
      } catch (error) {
        console.error('Error fetching post branches:', error);
      }
    };

    const fetchParcelMachines = async () => {
      try {
        const machines = await getParcelMachines();
        setParcelMachines(machines);
      } catch (error) {
        console.error('Error fetching parcel machines:', error);
      }
    };

    fetchLocations();
    fetchParcelMachines();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectChange = (option) => {
    if (option === "departments") {
      setShowPostamats(false);
      setShowDepartments(true);
    } else if (option === "postamats") {
      setShowDepartments(false);
      setShowPostamats(true);
    }
    setIsOpen(false); // Закрити спадний список після вибору
  };

  const handleLocationClick = (coordinates, index) => {
    setIsOpen(false); // Закрити спадний список після вибору
    setInitialCoordinates(coordinates); 
    setZoom(13);
    setSelectedItemIndex(index);
    console.log('Redirecting to coordinates:', coordinates);
  };

  return (
    <div className="home-page">
      <div className="home-map-and-services">
        <div className="home-map">
        <div className="rectangle-parent2-home">
        <div className="frame-child3-home" />
        <div className="rectangle-group1-home">
          <div className="div11">
          <b>{showPostamats && showDepartments ? 'Всі пункти видачі' : showPostamats ? 'Всі Поштомати' : showDepartments ? 'Всі Відділення' : ''}</b>
            <b className="b9">({allLocations.length})</b>
          </div>
          <div ref={dropdownRef} className="dropdown-container-home" onClick={toggleDropdown}>
            {isOpen && (
              <div className={showPostamats ? "dropdown-list-home" : "dropdown-list-home2"}>
                <ul className='dropdown-list-ul-home'>
                  <li className="dropdown-list-li-home" onClick={() => handleSelectChange("departments")}>Відділення</li>
                  <li className="dropdown-list-li-home" onClick={() => handleSelectChange("postamats")}>Поштомати</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="text-frame" onClick={toggleDropdown}>
          <img
            className="group-frame-icon"
            alt=""
            src="/group-frame.svg"
          />
        </div>
        <img
          className="rectangle-frame-icon"
          alt=""
          src="/rectangle-frame.svg"
          onClick={toggleDropdown}
        />
       
      </div>
        <MapContainer ref={mapRef} center={initialCoordinates} zoom={zoom} style={{ height: '360px', width: '615px', borderRadius:15, zIndex: 1 }}>
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                  />
                  {allLocations.map((location, index) => (
                    <Marker
                      key={index}
                      position={location.coordinates}
                      icon={parcelMachines.some(machine => machine.name === location.name) ? postamatMarkerIcon : customMarkerIcon}
                    >
                      <Popup>{location.name}</Popup>
                    </Marker>
                  ))}
                </MapContainer>
        </div>
        <div className="home-services">
            <div className='home-service-title'>
              <h3 className='home-services-h3'>Останні послуги</h3>
              <p className='home-services-p'>{"Переглянути всі >"}</p>
           </div>
        </div>
      </div>
      <div className="home-top5-tracking">
        <div className='home-top5-tracking-title'>
          <h3 className='history-tracking-h3'>Історія відстежень</h3>
          <img className='two-dots-image' src='two-dots.png'></img>
        </div>
        <div className="frame-group1-home"  style={{ zIndex: 2 }}>
                  <div className="component-1-home">
                    <div className="header-group-home">
                      <input
                        className="search-drum-kits-home"
                        placeholder='Знайти за номером накладної'
                        type="text"
                      />
                      <button className="phmagnifying-glass-bold-wrapper" >
                        <p>Пошук</p>
                      </button>
                    </div>
                  </div>  
        </div>
        <div className='history-tracking-warning'>
            <img src='i.png' className='i-image'/>
            <p className='history-tracking-p'>Будь ласка, зверніть увагу: звичайне або своєчасне упаковування відбувається протягом кілька днів без сканування</p>
        </div>
        <div className='history-thacking-list'>

        </div>
        <div className="frame-wrapper1-home">
              <button className="group-button-home">
                <div className="frame-child1" />
                <b className="b1">Більше</b>
              </button>
            </div>
      </div>
    </div>
  );
}

export default Home;
