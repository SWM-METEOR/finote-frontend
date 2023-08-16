'use client';
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsTilemap from 'highcharts/modules/tilemap';
import HighchartsMapModule from 'highcharts/modules/map';

HighchartsMapModule(Highcharts);
HighchartsTilemap(Highcharts);

export default function TechMapContainer() {
  const mapOptions = {
    chart: {
      aspectRatio: 1,
      width: 720,
      height: 400,
      zoomType: 'x',
    },
    title: {
      text: '유리 님의 TechMap',
    },
    subtitle: {
      text: '작성글을 기반으로 분석되었습니다.',
    },
    xAxis: {
      visible: false,
    },
    yAxis: {
      visible: false,
    },
    colorAxis: {
      dataClasses: [
        {
          to: 24,
          color: '#FFEAC1',
          name: '기술 점수 25점 이하',
        },
        {
          from: 25,
          to: 50,
          color: '#FFC73E',
          name: '25 ~ 50점',
        },
        {
          from: 51,
          to: 75,
          color: '#FFAA02',
          name: '51 ~ 75점',
        },
        {
          from: 76,
          color: '#DD7802',
          name: '76 ~ 100점',
        },
      ],
    },
    tooltip: {
      headerFormat: '<b>{point.key}</b><br/>',
      pointFormat: '기술 점수: <b>{point.value}</b>',
    },
    series: [
      {
        type: 'tilemap',
        tileShape: 'circle',
        dataLabels: {
          enabled: true,
          format: '{point.hc-a2}',
          color: '#000000',
          style: {
            textOutline: false,
          },
        },
        data: [
          {
            'hc-a2': 'React',
            name: 'React',
            x: 1,
            y: 3,
            value: 26,
          },
          {
            'hc-a2': 'Javascript',
            name: 'Javascript',
            x: 1,
            y: 4,
            value: 80,
          },
          {
            'hc-a2': 'Typescript',
            name: 'Typescript',
            x: 2,
            y: 3,
            value: 55,
          },
          {
            'hc-a2': 'Redux',
            name: 'Redux',
            x: 2,
            y: 4,
            value: 5,
          },
          {
            'hc-a2': 'Network',
            name: 'Network',
            x: 6,
            y: 1,
            value: 10,
          },
          {
            'hc-a2': 'HTTPS',
            name: 'HTTPS',
            x: 5,
            y: 2,
            value: 26,
          },
          {
            'hc-a2': 'DNS',
            name: 'DNS',
            x: 5,
            y: 1,
            value: 3,
          },
          {
            'hc-a2': 'Java',
            name: 'Java',
            x: 6,
            y: 4,
            value: 40,
          },
          {
            'hc-a2': 'Spring',
            name: 'Spring',
            x: 7,
            y: 4,
            value: 68,
          },
          {
            'hc-a2': 'JPA',
            name: 'JPA',
            x: 6,
            y: 5,
            value: 90,
          },
          {
            'hc-a2': 'Gradle',
            name: 'Gradle',
            x: 5,
            y: 4,
            value: 40,
          },
        ],
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={mapOptions} />
    </div>
  );
}
