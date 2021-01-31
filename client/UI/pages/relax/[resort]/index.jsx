import React, {Component, useEffect, useState} from 'react';
import { withRouter } from 'next/router';
import ClientLayout from '../../../layouts/ClientLayout.jsx';
import ChooseResort from '../ChooseResort.jsx';
import List from './List.jsx';
import classes from './index.module.scss';

class Resort extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            Component_New: props.component,
            router: props.router,
            resort: props.resort
        }
        this.state.resort = props.router.query.resort;
        console.log(this.state.router);
        console.log(this.state.resort);
        //this.state.router.events.on('routeChangeComplete', (url, { shallow }) => console.log('route chainge'));
    }

    async getStaticProps(context) {
        console.log('Get inital');
        // context.push(context.asPath)
        console.log(context);
        // context.reaload();
        // return {
        //     props: {
        //         resort: context.query.resort
        //     }
        // }
    }

    RenderComponent() {
        let Compo = this.state.Component_New;
        if(Compo)
            return <Compo {...this.props}/>;
        else
            return;
    }

    render() {
        return (
            <ClientLayout>
                <List resort={this.state.resort}/>
            </ClientLayout>
        )
    }
}

export default withRouter(Resort);
