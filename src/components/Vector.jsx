import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MantineProvider, createTheme, Checkbox, Select } from '@mantine/core';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "./Vector.css";

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



const Vector = () => {
  const [groupCheckboxChecked, setGroupCheckboxChecked] = useState(true);

  const [showPostamats, setShowPostamats] = useState(false);
  const [showDepartments, setShowDepartments] = useState(true);

  const [locations, setLocations] = useState([]);
  const [parcelMachines, setParcelMachines] = useState([]);

  const [initialCoordinates, setInitialCoordinates] = useState([49.6, 30.7]);
  const [zoom, setZoom] = useState(7);

  const [searchText, setSearchText] = useState('');
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const searchRef = useRef(null);
  const mapRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  // const locations = [
  //   { name: 'Kyiv', coordinates: [50.4501, 30.5234] },
  //   { name: 'Lviv', coordinates: [49.8397, 24.0297] },
  //   { name: 'Chernivtsi', coordinates: [48.2921, 25.9352] },
  // ];

  // const additionalLocation = { name: 'Poshtomat', coordinates: [48.3921, 25.7352] };

  const allLocations = [
    ...(showPostamats ? parcelMachines : []),
    ...(showDepartments ? locations : [])
  ];

  // Custom marker icon
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

  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectChange = event => {
    setSelectedLocation(event.target.value);
  };

  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleShowDepartmentsClick = () => {
    setShowDepartments(!showDepartments);
    setShowPostamats(false);
  };

  const handleShowPostamatsClick = () => {
    setShowPostamats(!showPostamats);
    setShowDepartments(false);
  };

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

  const handleSearchChange = event => {
    setSearchText(event.target.value);
    setIsOpenSearch(true);
  };

  const filteredLocations = allLocations.filter(location =>
    location.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleClickOutsideSearch = event => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsOpenSearch(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideSearch);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideSearch);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault(); 
      setSelectedIndex((prevIndex) => (prevIndex === null ? 0 : Math.min(prevIndex + 1, filteredLocations.length - 1)));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault(); 
      setSelectedIndex((prevIndex) => (prevIndex === null ? 0 : Math.max(prevIndex - 1, 0)));
    } else if (event.key === 'Enter') {
      event.preventDefault(); 
      if (selectedIndex !== null) {
        handleLocationClick(filteredLocations[selectedIndex].coordinates);
      }
    }
  };

  const handleLocationClick = (coordinates, index) => {
    setIsOpenSearch(false); 
    setInitialCoordinates(coordinates); 
    setZoom(13);
    setSelectedItemIndex(index);
    console.log('Redirecting to coordinates:', coordinates);
  };
  
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(initialCoordinates, zoom); 
    }
  }, [initialCoordinates, zoom]);
  
  const handleSearch = () => {
    handleSearchChange({ target: { value: searchText } });
  };
  
  return (
    <section className="vector">
      <div className="frame-div" style={{zIndex:2}}>
            <div className="frame-parent1">
            <MantineProvider theme={theme}>
            <Checkbox
                  label="Поштомати"
                  color="white"
                  variant="outline"
                  onChange={(event) => setShowPostamats(event.currentTarget.checked)}
                />
                </MantineProvider>
              </div>
              <div className="header-logo-parent">
              <MantineProvider theme={theme}>
                <Checkbox
                  defaultChecked
                  label="Відділення"
                  color="white"
                  variant="outline"
                  onChange={(event) => setShowDepartments(event.currentTarget.checked)}
                />
                </MantineProvider>
              </div>
            </div>
      <div className="group1">
        <div className="text-container">
          
         <div className="text1">
      <div className="rectangle-parent2">
        <div className="frame-child3" />
        <div className="rectangle-group1">
          <div className="div11">
          <b>{showPostamats && showDepartments ? 'Всі пункти видачі' : showPostamats ? 'Всі Поштомати' : showDepartments ? 'Всі Відділення' : ''}</b>
            <b className="b9">({allLocations.length})</b>
          </div>
          <div ref={dropdownRef} className="dropdown-container">
          {isOpen && (
        <div className="dropdown-list">
          <ul>
            {allLocations.map((location, index) => (
              <li key={location.name} onClick={() => handleLocationClick(location.coordinates, index)}>{location.name}</li>
            ))}
          </ul>
        </div>
      )}
      </div>
        </div>
        <div className="text-frame">
          <img
            className="group-frame-icon"
            alt=""
            src="/group-frame.svg"
            onClick={toggleDropdown}
          />
        </div>
        <img
          className="rectangle-frame-icon"
          alt=""
          src="/rectangle-frame.svg"
          onClick={toggleDropdown}
        />
       
      </div>
    </div>
          
        </div>
        <div className="text-frame1">
          <div className="text-frame2">
            <h1 className="h13">Відстеження Посилки</h1>
            <div className="rectangle-frame1">
              <div className="wrapper-star-animate3">
                <img
                  className="star-animate-icon3"
                  alt=""
                  src="/star-animate-1.svg"
                />
              </div>
              <div className="group-frame">
                <div className="group-frame-child" />
                <MapContainer ref={mapRef} center={initialCoordinates} zoom={zoom} style={{ height: '555px', width: '100%', borderRadius:15, zIndex: 1 }}>
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
                
                
                <div className="frame-group1"  style={{ zIndex: 2 }}>
                  <div className="component-1">
                    <div className="header-group">
                      <input
                        className="search-drum-kits"
                        placeholder={showPostamats && showDepartments ? 'Знайти пункти видачі' : showPostamats ? 'Знайти поштомати' : showDepartments ? 'Знайти відділення' : ''}
                        type="text"
                        value={searchText}
                        onChange={handleSearchChange}
                      />
                      {isOpenSearch && (
                      <div className="dropdown-container-search" ref={searchRef} onKeyDown={handleKeyDown}>
                        <ul className="dropdown-list-search">
                          {filteredLocations.map((location, index) => (
                            <li className="dropdown-list-search-li" key={location.name} onClick={() => handleLocationClick(location.coordinates, index)}>{location.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                      <div className="phmagnifying-glass-bold-wrapper" onClick={() => handleSearch()}>
                        <img
                          className="phmagnifying-glass-bold-icon"
                          alt=""
                          src="/phmagnifyingglassbold.svg"
                        />
                      </div>
                    </div>
                  </div>  
                </div>

              </div>
              <img
                className="rectangle-frame-child"
                alt=""
                src="/group-68@2x.png"
              />
            </div>
          </div>
          <div className="group-wrapper">
            <button className="group2">
              <div className="group-child" />
              <b className="b11">для клієнтів</b>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vector;
