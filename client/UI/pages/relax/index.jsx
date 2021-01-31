import React, {Component, useEffect, useState} from 'react';
import ClientLayout from '../../layouts/ClientLayout.jsx';
import ChooseResort from './ChooseResort.jsx';
import classes from './index.module.scss';

// import ClientLayout from './../../layouts/ClientLayout.jsx';
// import ChooseResort from './ChooseResort.jsx';
// import List from './List.jsx';

const Relax = (props) => {

    return (
        <ClientLayout>
            <ChooseResort/>
        </ClientLayout>
    )
}

export default Relax;
