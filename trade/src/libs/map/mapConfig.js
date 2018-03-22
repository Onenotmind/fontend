// import ethSymbol from '../../images/ethereum.png' 
let testFinalData = [
  { value : [42.5, 1.5, 20] },
  { value : [-21.2333, 41.5, 40] },
  { value : [-92.5, 132.5, 30] },
  { value : [-142.5, 21.5, 60] },
  { value : [242.5, -41.5, 70] }
]
let mapConfig  = {
  backgroundColor: '#003',
    title: {
        // text: 'The World',
        // subtext: 'from United Nations, Total population, both sexes combined, as of 1 July (thousands)',
        // sublink: 'http://esa.un.org/wpp/Excel-Data/population.htm',
        left: 'center',
        top: 'top'
    },
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            var value = (params.value + '').split('.');
            value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
                    + '.' + value[1];
            return params.seriesName + '<br/>' + params.name + ' : ' + value;
        }
    },
    // toolbox: {
  //     show: true,
  //     orient: 'vertical',
  //     left: 'right',
  //     top: 'center',
  //     feature: {
  //         dataView: {readOnly: false},
  //         restore: {},
  //         saveAsImage: {}
  //     }
  // },
    // visualMap: {
    //     min: 0,
    //     max: 1000000,
    //     text:['High','Low'],
    //     realtime: false,
    //     calculable: true,
    //     inRange: {
    //         color: ['lightskyblue','yellow', 'orangered']
    //     }
    // },
    geo: {
        name: 'World Population (2010)',
        type: 'map',
        map: 'world',
        roam: true,
        label: {
            emphasis: {
                show: false
            }
        },
        itemStyle: {
                normal: {
                    borderColor: '#003',
                    color: '#005'
                }
            }
    },
     series : [
        {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: testFinalData,
            large: true,
            // largeThreshold: 100,
            symbolSize: 20,
            showEffectOn: 'render',
    rippleEffect: {
      brushType: 'stroke'
    },
    hoverAnimation: true,
    label: {
      normal: {
        formatter: '{b}',
        position: 'right',
        show: true
      }
    },
    itemStyle: {
      normal: {
        color: 'purple',
        shadowBlur: 100,
        shadowColor: 'white'
      }
    },
    zlevel: 1
        }
    ]
};

function getMapConfig (val) {
  return {
    backgroundColor: '#003',
    title: {},
    tooltip: {},
    geo: {
      name: '',
      type: 'map',
      map: 'world',
      roam: true,
      label: {
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          borderColor: '#003',
          color: '#005'
        }
      }
    },
    series: [{
      type: 'effectScatter',
      coordinateSystem: 'geo',
      data: val,
      large: true,
      // largeThreshold: 100,
      symbolSize: 20,
      // symbol: 'image://(./static/img/ethereum.png)',
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: true
        }
      },
      itemStyle: {
        normal: {
          color: 'purple',
          shadowBlur: 100,
          shadowColor: 'white'
        }
      },
      zlevel: 1
    },
    {
      type: 'scatter',
      coordinateSystem: 'geo',
      data: [{ value : [142.5, 1.5, 20] }],
      large: true,
      // largeThreshold: 100,
      symbolSize: 25,
      // symbol: 'arrow',
      symbol: 'image://https://image.ibb.co/iLmapc/aui_icon_location_1.png',
      itemStyle: {
        normal: {
          color: 'white'
        }
      }
    }]
  }
}

module.exports = {
	getMapConfig: getMapConfig
}