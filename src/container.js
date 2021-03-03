'use strict';

import {LoadingScreen} from "./loadingScreen";
import {HistoryGraph} from "./historyGraph";

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            ready: false,
            data: null,
            interval: 1
        };

        let intervalSelect = document.getElementById('interval-select');
        intervalSelect.onchange = () => {
            const interval = parseInt(intervalSelect.value);
            this.setState({
                interval,
                ready: false
            });
        };
    }

    dataLoaded(data, intervalAtComputation) {
        if (intervalAtComputation == this.state.interval) {
            this.setState({
                ready: true,
                data
            });
        }
    }

    render() {
        if (this.state.ready) {
            return <HistoryGraph historyData={this.state.data}/>;
        }
        
        let currentInterval = this.state.interval;
        return <LoadingScreen interval={currentInterval} onDataLoaded={(data) => this.dataLoaded(data, currentInterval)}/>;
    }
}

const domContainer = document.querySelector('#container');
ReactDOM.render(<Container />, domContainer);