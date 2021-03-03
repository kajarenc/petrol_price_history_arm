export class HistoryGraph extends React.Component {
    /**
     * @param props - {historyData} 
     */
    constructor(props) {
        super(props);
        this.state = {
            'interval': 1
        };
        am4core.useTheme(am4themes_animated);
    }
    render() {
        return <div id="chartContainer"></div>;
    }

    componentDidMount() {
        const chart = am4core.create("chartContainer", am4charts.XYChart);
        let keys = new Set();
        const graphData = this.props.historyData.map(([date, content]) => {
            let previousDate = new Date(date);
            // Considering that we get 1 point of data for each day
            previousDate.setDate(previousDate.getDate() - 1);
            let graphDataPoints = {
                date,
                previousDate,
            };
            for (let contentPoint of content) {
                const key = contentPoint.provider.toUpperCase() + " " + contentPoint.type;
                keys.add(key);
                graphDataPoints[key] = contentPoint.price;
            }
            return graphDataPoints;
        });

        chart.legend = new am4charts.Legend();
        chart.data = graphData;

        // Create axes
        const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 50;

        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        for (let key of keys) {
            const series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = key;
            series.dataFields.dateX = "date";
            series.strokeWidth = 2;
            series.name = key;
            series.tooltipText = "{name}: [bold]{valueY}[/]";
        }
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.xAxis = dateAxis;

        return chartContainer;
    }
}