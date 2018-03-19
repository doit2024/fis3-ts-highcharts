interface LineData {
    name: string
    themeColor: string
    data: [string, number][]
}
interface statisticBarData {
    type: string
    labelx: number
    data: [string, number][]
}
let options = {
    getBar (data:object, callback:(e)=>{}) {
        return {
            chart: { type: 'column' },
            credits: { enabled: false },
            legend: { enabled: false },
            title: { text: null },
            yAxis: { visible: false },
            tooltip: {
                borderWidth: 0,
                borderRadius: 6,
                backgroundColor: '#4098ea',
                style: {
                    color: '#fff',
                },
                valueSuffix: ' km'
            },
            plotOptions: {
                series: {
                    pointPadding: -0.1
                },
                column: {
                    events: {
                        click: callback
                    }
                }
            },
            xAxis: {
                categories: [0, 24],
                tickWidth: 0,
                tickInterval: 6,
                max: 24,
                labels: {
                    x: -8
                }
            },
            series: [{
                name: '里程数',
                data
            }]
        }
    },
    getStatisticBar (data:statisticBarData) {
        return {
            chart: { 
                panning: true,
                pinchType: 'x',
                resetZoomButton: {
                    theme: {
                        visibility: 'hidden'
                    }
                }
            },
            legend: { enabled: false },
            title: { text: null },
            credits: { enabled: false },
            yAxis: { visible: false },
            tooltip: {
                followTouchMove: false,
                borderWidth: 0,
                borderRadius: 6,
                backgroundColor: '#4098ea',
                style: {
                    color: '#fff',
                },
                xDateFormat: '%Y-%m-%d',
                valueSuffix: ' km'
            },
            xAxis: {
                type: 'datetime',
                range: 2,
                tickPosition: 'inside',
                dateTimeLabelFormats: {
                    day: '%m-%d',
                    week: '%e. %b',
                    month: '%m月'
                },
                labels: {
                    // align: 'right',
                    x: data.labelx
                }
            },
            series: [{
                type: 'column',
                name: '当天总里程',
                data: data.data
            }]
        }
    },
    getLine (data:LineData) {
        return {
            chart: {
                type: 'spline',
                spacingLeft: 0,
                spacingRight: 0
            },
            credits: { enabled: false },
            title: { text: null },
            colors: [data.themeColor],
            xAxis: {
                visible: false,
            },
            yAxis: {
                title: {
                    text: null
                },
                gridLineColor: '#aaa',
                gridLineDashStyle: 'dot'
            },
            legend: {
                enabled: false
            },
            tooltip: {
                backgroundColor: Highcharts.Color(data.themeColor).setOpacity(0.5).get('rgba'),
                useHTML: true,
                borderWidth: 0,
                borderRadius: 10,
                shadow: false,
                style: {
                    color: '#fff',
                }
            },
            plotOptions: {
                spline: {
                    marker: {
                        enabled: false
                    }
                }
            },
            series: [data]
        }
    },
    getLineRuler (data:LineData, callback:(e)=>{}) {
        return {
            chart: {
                type: 'spline',
                spacingLeft: 0,
                spacingRight: 0
            },
            credits: { enabled: false },
            title: { text: null },
            colors: [data.themeColor],
            xAxis: {
                categories: [0, 24],
                tickWidth: 0,
                tickInterval: 6,
                max: 24,
                crosshair: {
                    width: 1,
                    color: data.themeColor
                }
            },
            yAxis: {
                title: {
                    text: null
                },
                gridLineColor: '#aaa',
                gridLineDashStyle: 'dot'
            },
            tooltip: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                spline: {
                    marker: {
                        enabled: false
                    },
                    point: {
                        events: {
                            mouseOver (e) {
                                callback(e)
                            }
                        }
                    }
                }
            },
            series: [data]
        }
    },
    getPie (data:([string, number]|object)[]) {
        return {
            credits: { enabled: false },
            chart: {
                type: 'pie',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: '心率区间',
                // x: 42,
                margin: 0,
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#485b6d'
                }
            },
            colors: [
                '#df1d5f',
                '#ed682f',
                '#fbb900',
                '#00d977',
                '#4098e2',
                '#d8d8d8'
            ],
            legend: {
                align: 'right',
                layout: 'vertical',
                verticalAlign: 'middle',
                y: 10,
                itemMarginBottom: 3,
                labelFormatter: function () {
                    const total = this.series.yData.reduce((pre, cur) => pre + cur, 0)
                    const persent = Math.round(100 * this.y / total)
                    return `${this.name}: ${persent}%`
                },
                title: {
                    style: {
                        color: '#fff'
                    }
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true,
                    enableMouseTracking: false
                }
            },
            series: [{
                type: 'pie',
                innerSize: '80%',
                name: '浏览器访问量占比',
                data
            }]
        }
    }
}
