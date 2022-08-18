import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="register" element={<div>hwdawdawdi</div>} />
          <Route path="hi" element={<div>hi</div>} />
          <Route
            path="*"
            element={
              <div>
                <p>There is nothing here!</p>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
