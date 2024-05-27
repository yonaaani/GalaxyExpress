import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MantineProvider, createTheme, Checkbox, Select } from '@mantine/core';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "./Vector.css";

const Vector = () => {
  const [groupCheckboxChecked, setGroupCheckboxChecked] = useState(true);

  const [showPostamats, setShowPostamats] = useState(false);
  const [showDepartments, setShowDepartments] = useState(true);

  const initialCoordinates = [49.6, 30.7]; 

  const locations = [
    { name: 'Kyiv', coordinates: [50.4501, 30.5234] },
    { name: 'Lviv', coordinates: [49.8397, 24.0297] },
    { name: 'Chernivtsi', coordinates: [48.2921, 25.9352] },
  ];

  const additionalLocation = { name: 'Poshtomat', coordinates: [48.3921, 25.7352] };

  const allLocations = [
    ...(showPostamats ? [additionalLocation] : []),
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
          {allLocations.map(location => (
                  <li key={location.name}>{location.name}</li>
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
                <MapContainer center={initialCoordinates} zoom={7} style={{ height: '555px', width: '100%', borderRadius:15, zIndex: 1 }}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
            
            
          />
          {allLocations.map((location, index) => (
            <Marker
            key={index}
            position={location.coordinates}
            icon={locations.includes(location) ? customMarkerIcon : postamatMarkerIcon}
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
                      />
                      <div className="phmagnifying-glass-bold-wrapper">
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
