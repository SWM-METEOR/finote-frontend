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
      width: 960,
      height: 400,
      zoomType: 'x',
    },
    credits: {
      enabled: false,
    },
    title: {
      text: '',
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
    <div className="flex flex-col w-[1000px] h-[480px] bg-white m-20 rounded-[20px]">
      <p className="flex gap-[10px] items-center border-b-[1px] border-[#DDDDDD] py-[25px] px-[30px]">
        <span className="text-[20px] font-bold">춘식이님의 Tech Map</span>
        <span className="text-[15px] text-[#666666]">*작성글을 기반으로 분석되었습니다.</span>
      </p>
      <div className="self-center">
        <HighchartsReact highcharts={Highcharts} options={mapOptions} />
      </div>
    </div>
  );
}
