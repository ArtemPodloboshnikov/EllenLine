import React, {Component, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { BrowserRouter, Route } from 'react-router-dom';
import Resort from './Resort.jsx';
import ClientLayout from '../../layouts/ClientLayout.jsx';
import ChooseResort from './ChooseResort.jsx';

// import ClientLayout from './../../layouts/ClientLayout.jsx';
// import ChooseResort from './ChooseResort.jsx';
// import List from './List.jsx';
// import classes from './[resort].module.scss';

const Relax = (props) => {

    return (
        <ClientLayout>
            <ChooseResort/>
        </ClientLayout>
    )
}

export default Relax;
