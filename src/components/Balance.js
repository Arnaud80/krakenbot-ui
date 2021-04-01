import React from 'react';
import { assets, EURpairs } from './Kraken';
import TradesHistory from './TradesHistory';
import { Accordion, Card, useAccordionToggle } from 'react-bootstrap';
import { Chart } from '@bit/primefaces.primereact.chart';


let dataChart = {
  labels: [],
  datasets: [
    {
      data: [300, 50, 300],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }
  ]
};

const Balance = props => {
    const balance = props.balance;
    const tradesHistory = props.tradesHistory;
    const tickers = props.tickers;

    const balanceIsNull = balance === null;
    const tickersIsNull = tickers === null;

    if(!balanceIsNull && !tickersIsNull) {        
        console.log('Balance - balance =', balance);
        console.log('Balance - tickers =', tickers);
        
        for(let i=0;i<tickers.length;i++) {
            dataChart.labels[i]=tickers[i].pair;
            console.log('Balance - tickers[i].data.c[0] =', tickers[i].data.c[0]);
            
            dataChart.datasets.data[i]=parseFloat(tickers[i].data.c[0]);
        }
    }

    /*Object.keys(balance).filter(key => balance[key]>=0.0001).map((key, i) => (dataChart.labels[i]=assets[key]));
        console.log('Balance DEBUG',dataChart.labels[0]);*/
    
    function CustomToggle({ children, eventKey }) {
        const decoratedOnClick = useAccordionToggle(eventKey, () =>
        //console.log(eventKey)
        props.onClick(EURpairs[eventKey])
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
        <div className='Balance'>
        {balanceIsNull || tickersIsNull ? (
            <>...</>
        ) : (
            <>
                <div style={{ width: 400 }}>
                    <Chart type='pie' data={dataChart} />
                </div>
                <Accordion defaultActiveKey="0">
                {   // Loop on returned assets
                    Object.keys(balance).filter(key => balance[key]>=0.0001).map((key, i) => (
                        <Card key={i}>
                            <Card.Header>
                                <CustomToggle eventKey={key}>
                                {assets[key]} ({key})
                                </CustomToggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={key}>
                                <Card.Body>
                                    {balance[key]}
                                    <TradesHistory tradesHistory={tradesHistory} currentPair={EURpairs[key]} currentBalance={balance[key]}/>
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