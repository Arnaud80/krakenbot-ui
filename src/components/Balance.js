import React from 'react';
import { assets, EURpairs } from './Kraken';
import TradesHistory from './TradesHistory';
import { Accordion, Card, useAccordionToggle } from 'react-bootstrap';
import { Chart } from '@bit/primefaces.primereact.chart';


let dataChart = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }
  ]
}

const Balance = props => {
    const balance = props.balance;
    const tradesHistory = props.tradesHistory;
    const balanceIsNull = balance === null;

    let totalBalance = 0.0;

    console.log('Balance - balance =', balance);
    console.log('Balance - tradesHistory =', tradesHistory);


    if(!balanceIsNull) {          
        for(let i=0;i<balance.length;i++) {
            dataChart.labels[i]=balance[i][1];
            
            dataChart.datasets[0].data[i]=parseFloat(balance[i][2]) * parseFloat(balance[i][3]);
            totalBalance+=dataChart.datasets[0].data[i];
        }
    }
    
    function CustomToggle({ children, eventKey }) {
      console.log('Balance - CustomToggle - eventKey=',eventKey);
      console.log('Balance - CustomToggle - balance[eventKey][1]=',balance[eventKey][1]);

      const decoratedOnClick = useAccordionToggle(eventKey, () =>
        props.onClick(balance[eventKey][1])
      );
        return (
          <button
            type="button"
            style={{ backgroundColor: "orange" }}
            onClick={decoratedOnClick}
          >
            {children}
          </button>
        );
      }

    return (
        <div className='Balance' data-testid='balance'>
        {balanceIsNull ? (
            <>...</>
        ) : (
          <>
            <div style={{ width: 400 }}>
              {props.test===null?(<Chart data-testid='chart' type='pie' data={dataChart}/>):('')}
              {totalBalance} Euros
            </div>
            <Accordion defaultActiveKey="0" data-testid='accordion'>
                { // Loop on returned assets
                  Object.keys(balance).map((i) => (
                      <Card key={i} data-testid='card{i}'>
                          <Card.Header>
                              <CustomToggle eventKey={i} data-testid='toggle{i}'>
                              {assets[balance[i][0]]} ({balance[i][0]})
                              </CustomToggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey={i}>
                              <Card.Body data-testid='body{i}'>
                                  {balance[i][2]}
                                  <TradesHistory tradesHistory={tradesHistory} currentPair={EURpairs[balance[i][0]]} currentBalance={balance[balance[i][0]]}/>
                              </Card.Body>
                          </Accordion.Collapse>
                      </Card>
                  ))
                }
              </Accordion> 
          </>
        )}
        </div>
    )
}

export default Balance;

/*
<div className='Balance' data-testid='balance'>testt</div>
            <div style={{ width: 400 }}>
              <Chart type='pie' data={dataChart} data-testid='chart'/>
              {totalBalance} Euros
            </div>
              <Accordion defaultActiveKey="0" data-testid='accordion'>
                { // Loop on returned assets
                  Object.keys(balance).map((i) => (
                      <Card key={i} data-testid='card{i}'>
                          <Card.Header>
                              <CustomToggle eventKey={i} data-testid='toggle{i}'>
                              {assets[balance[i][0]]} ({balance[i][0]})
                              </CustomToggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey={i}>
                              <Card.Body data-testid='body{i}'>
                                  {balance[i][2]}
                                  <TradesHistory tradesHistory={tradesHistory} currentPair={EURpairs[balance[i][0]]} currentBalance={balance[balance[i][0]]}/>
                              </Card.Body>
                          </Accordion.Collapse>
                      </Card>
                  ))
                }
              </Accordion> 
*/