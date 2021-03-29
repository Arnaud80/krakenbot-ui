import React from 'react';
import { assets, EURpairs } from './Kraken';
import TradesHistory from './TradesHistory';
import { Accordion, Card, useAccordionToggle } from 'react-bootstrap';

const Balance = props => {
    const balance = props.balance;
    const tradesHistory = props.tradesHistory;

    const balanceIsNull = balance === null;
    console.log('Balance', balance);

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
        {balanceIsNull ? (
            <>...</>
        ) : (
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
        )}
        </div>
    )
}

export default Balance;