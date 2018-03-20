let testData = [
  { 'latitude':42.5, 'longitude':1.5, 'value': 20 },
  { 'latitude':-21.2333, 'longitude':-159.7667, 'value': 40 },
  {'latitude':19, 'longitude':-70.6667,'value': 75},
  { 'latitude':-21.2333, 'longitude':59.7667, 'value': 10 },
  { 'latitude':21.2333, 'longitude':-159.7667, 'value': 40 }
]

let testFinalData = [
  { value : [42.5, 1.5, 20] },
  { value : [-21.2333, 41.5, 40] },
  { value : [-92.5, 132.5, 30] },
  { value : [-142.5, 21.5, 60] },
  { value : [242.5, -41.5, 70] }
]
// 获取地理坐标与值
function convertData (data) {
  let res = []
  for (let i = 0; i < data.length; i++) {
    if (data[i]) {
      res.push({
        value: [data[i].latitude, data[i].longitude, data[i].value]
      })
    }
  }
  return res
}


let mapConfig = {
  title: {},
  tooltip: {},
  bmap: {
    center: [104.114129, 37.550339],
    zoom: 5,
    roam: true,
    mapStyle: {
      styleJson: [{
        'featureType': 'water',
        'elementType': 'all',
        'stylers': {
            'color': '#d1d1d1'
        }
    }, {
        'featureType': 'land',
        'elementType': 'all',
        'stylers': {
            'color': '#f3f3f3'
        }
    }, {
        'featureType': 'railway',
        'elementType': 'all',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'highway',
        'elementType': 'all',
        'stylers': {
            'color': '#fdfdfd'
        }
    }, {
        'featureType': 'highway',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'arterial',
        'elementType': 'geometry',
        'stylers': {
            'color': '#fefefe'
        }
    }, {
        'featureType': 'arterial',
        'elementType': 'geometry.fill',
        'stylers': {
            'color': '#fefefe'
        }
    }, {
        'featureType': 'poi',
        'elementType': 'all',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'green',
        'elementType': 'all',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'subway',
        'elementType': 'all',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'manmade',
        'elementType': 'all',
        'stylers': {
            'color': '#d1d1d1'
        }
    }, {
        'featureType': 'local',
        'elementType': 'all',
        'stylers': {
            'color': '#d1d1d1'
        }
    }, {
        'featureType': 'arterial',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'boundary',
        'elementType': 'all',
        'stylers': {
            'color': '#fefefe'
        }
    }, {
        'featureType': 'building',
        'elementType': 'all',
        'stylers': {
            'color': '#d1d1d1'
        }
    }, {
        'featureType': 'label',
        'elementType': 'labels.text.fill',
        'stylers': {
            'color': '#999999'
        }
      }]
    }
  },
  series: [{
    name: '',
    type: 'effectScatter',
    coordinateSystem: 'bmap',
    data: testFinalData,
    symbolSize: function (val) {
      return val[2] / 10;
    },
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
        shadowBlur: 10,
        shadowColor: '#333'
      }
    },
    zlevel: 1
  }]
}
module.exports = {
    mapConfig: mapConfig
}