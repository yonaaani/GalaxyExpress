import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
/* компонент з бібліотеки "react-router-dom", який використовується для обробки маршрутизації */
import { BrowserRouter } from "react-router-dom"; 
import "./global.css";
import { MantineProvider } from '@mantine/core';

const container = document.getElementById("root");
const root = createRoot(container);

/* ініціалізація саме цього root, що викликаю в html файлі */
root.render(  
  /* обробка маршрутизації саме, аби не прописувати всі частини коду в одному render */
  <BrowserRouter> 
  <MantineProvider>
    <App />
    </MantineProvider>
  </BrowserRouter>
);

reportWebVitals();
