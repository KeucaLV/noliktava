import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Darbinieks from './component/darbinieks';
import Pievienot from './component/pievienotPreci';
import Pasutit from './component/pasutit'
import Preces from './component/preces';
import Sanemsana from "./component/sanemsana";

function App() {
    return (
        <>
            {/*<Darbinieks />*/}
            {/*<Pievienot />*/}
            {/*<Pasutit />*/}
            {/*  <Preces />*/}
            <Sanemsana />
        </>
        // <Router>
        //     <Routes>
        //         <Route path="/component/darbinieks" element={<Darbinieks />} />
        //         <Route path="/component/pievienotPreci" element={<Pievienot />} />
        //         <Route path="/component/pasutit" element={<Pasutit />} />
        //         <Route path="/component/preces" element={<Preces />} />
        //     </Routes>
        // </Router>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));