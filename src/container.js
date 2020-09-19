'use strict';

import {LoadingScreen} from "./loadingScreen";
import {HistoryGraph} from "./historyGraph";

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            ready: false,
            data: null
        };
    }

    dataLoaded(data) {
        this.setState({
            ready: true,
            data
        });
    }

    render() {
        if (this.state.ready) {
            return <HistoryGraph historyData={this.state.data}/>; // TODO implement the chart
        }
        
        return <LoadingScreen onDataLoaded={(data) => this.dataLoaded(data)}/>;
    }
}

const domContainer = document.querySelector('#container');
ReactDOM.render(<Container />, domContainer);