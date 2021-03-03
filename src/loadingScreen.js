export class LoadingScreen extends React.Component {
    /**
     * @param props - {onDataLoaded}
     */
    constructor(props) {
        super(props);
        this.state = {
            loadedCount: 0,
            targetCount: 31,
            interval: this.props.interval
        };
        this.yearFormatter = new Intl.DateTimeFormat('en', { year: 'numeric' });
        this.monthFormatter = new Intl.DateTimeFormat('en', { month: '2-digit' });
        this.dayFormatter = new Intl.DateTimeFormat('en', { day: '2-digit' });
        
        this.loadData();
    }

    async loadData() {
        let promises = [];
        for (let i = this.state.targetCount - 1; i >= 0; i--) {
            let date = new Date();
            date.setDate(date.getDate() - i * this.state.interval);
            promises.push(this.loadDataOfDay(date));
        }
        let results = await Promise.all(promises);
        let filteredResults = results
            .filter(e => e && e[1]);
        this.props.onDataLoaded(filteredResults);
    }

    async loadDataOfDay(date) {
        const key = this.serializeDate(date);
        const response = await fetch(`history/${key}.json`);
        let data = null;
        if (response.ok) {
            data = await response.json();
        } else {
            console.log(`Could not find data for ${key}`);
        }
        this.setState({
            loadedCount: this.state.loadedCount + 1
        });
        return [date, data];
    }

    serializeDate(date) {
        const ye = this.yearFormatter.format(date);
        const mo = this.monthFormatter.format(date);
        const da = this.dayFormatter.format(date);
        return `${ye}-${mo}-${da}`;
    }

    render() {
        return <div id="loadingScreen">
            Loaded {this.state.loadedCount} of {this.state.targetCount}
        </div>;
    }
}