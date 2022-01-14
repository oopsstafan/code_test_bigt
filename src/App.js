import { Card, Descriptions, Popover, Button } from 'antd'
import ReactECharts from 'echarts-for-react';
import React from 'react';
import '../node_modules/antd/dist/antd.css'
import weatherInfo from './weatherInfo/weatherInfo'
function App() {
  React.useEffect(() => {
    /*
      In the real case, we are going to get AJAX data from server side
      when component firstly mounted. The data should be in json format.
      We can diretly handle json as js object and save it in the state for further
      reuse.
    */

    //  show data format in console
    console.log(weatherInfo.query.results.channel.item.forecast)
  }, [])
  let { location, item, units, wind, atmosphere, astronomy } = weatherInfo.query.results.channel
  //get forecast info as array
  let forecastInfo = item.forecast
  //get the first seven needed forecast info
  forecastInfo.length = 7
  //get needed date info as new array
  const dateArr = forecastInfo.map((item)=>{
    return item.date
  })
  //get needed day info as new array
  const dayArr = forecastInfo.map((item)=>{
    return item.day
  })
  //get needed high temperature info as new array
  const hiArr = forecastInfo.map((item)=>{
    return item.high
  })
  //get needed low temperature info as new array
  const lowArr = forecastInfo.map((item)=>{
    return item.low
  })
  //get weather condition info as new array
  const textArr = forecastInfo.map((item)=>{
    return item.text
  })
  //set options for chart
  const options = {
    title: {
      //title of the chart
      text: 'Temperature Change in the Coming Week'
    },
    tooltip: {
      trigger: 'axis',
      // triggerOn: 'click',
      formatter: function(arg){
        //set up day and condition var to further store day and condition info
        let day, condition
        //get needed day and weather condition info(when the dataIndex equals to index of the weatherinfo array)
        dayArr.forEach((item, index)=>{
          if (arg[0].dataIndex === index) day = item
        })
        textArr.forEach((item, index)=>{
          if (arg[0].dataIndex === index) condition = item
        })
        //show needed day, date, high temp, low temp, and weather condition info
        return `Day: ${day} <br/> Date: ${arg[0].axisValue} <br/> High Temp: ${arg[0].data} <br/> Low Temp: ${arg[1].data} <br/> Condition: ${condition}`
      }
    },
    legend: {},
    xAxis: {
      type: 'category',
      boundaryGap: true,
      //xAxis is date
      data: dateArr
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        //y axis is value with unit °F'
        formatter: '{value} °F'
      }
    },
    //here are two lines, high temp and low temp
    series: [
      {
        name: 'High Temp',
        type: 'line',
        data: hiArr,
      },
      {
        name: 'Low Temp',
        type: 'line',
        data: lowArr,
      }
      
    ]
  };
  return (
    <div className="App" style={{ width: '60%', margin: '0 auto' }}>
      <Card title="New York's Weather Test" >
        <Descriptions title="Current Conditions">
          <Descriptions.Item label="Location">{location.city}, {location.country}, {location.region}</Descriptions.Item>
          <Descriptions.Item label="Weather Description">{item.condition.text}</Descriptions.Item>
          <Descriptions.Item label="Temperature">{item.condition.temp} {units.temperature}</Descriptions.Item>
          <Descriptions.Item label="High Temperature">{item.forecast[0].high} {units.temperature}</Descriptions.Item>
          <Descriptions.Item label="Low Temperature">{item.forecast[0].low} {units.temperature}</Descriptions.Item>
        </Descriptions>
        <br />
        <Popover content={wind.speed + units.speed} trigger="hover">
          <Button>Wind Speed</Button>
        </Popover>&nbsp;
        <Popover content={atmosphere.humidity} trigger="hover">
          <Button>Humidity</Button>
        </Popover>&nbsp;
        <Popover content={atmosphere.pressure + units.pressure} trigger="hover">
          <Button>Pressure</Button>
        </Popover>&nbsp;
        <Popover content={astronomy.sunrise} trigger="hover">
          <Button>Sunrise Time</Button>
        </Popover>&nbsp;
        <Popover content={astronomy.sunset} trigger="hover">
          <Button>Sunset Time</Button>
        </Popover>&nbsp;
        <br/>
        <br/>
        <ReactECharts style={{height: '500px'}} option={options}/>

      </Card>

      

    </div>
  );
}

export default App;
