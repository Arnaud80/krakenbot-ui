import React from 'react';
import { assets, EURpairs } from './Kraken';

import { Accordion, Card, Button, useAccordionToggle } from 'react-bootstrap';
//import { useAccordionToggle } from "react-bootstrap/AccordionToggle";

const Balance = props => {
    const balance=props.balance;

    const balanceIsNull = balance === null;
    console.log('Balance', balance);

    const handleClick = (key) => {
        console.log('Balance - onClick :' + key);
    }

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
                Object.keys(balance).map((key, i) => (
                    <Card key={i}>
                        <Card.Header>
                            <CustomToggle eventKey={key}>
                            {assets[key]} ({key})
                            </CustomToggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={key}>
                            <Card.Body>{balance[key]}</Card.Body>
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