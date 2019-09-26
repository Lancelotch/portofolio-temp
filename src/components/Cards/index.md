---
name: Cards
menu: Components
---

import { Playground, Props } from 'docz'
import Cards from './'
import { Col, Row } from "antd";
import "antd/dist/antd.less"

# Cards

This is Cards of Monggopesen

## Properties (props)

<Props of={Cards} />

## Purpose Of Props

- Type: to set the classname of the card
- urlImage: url of the image
- title : string of the product name
- price : string of the product price
- showPlayButton : boolean to show play button
- discount: to display the persentage of the discount on the flag
- discountPrice: to display the price before the discount applied
- rateValue: to set the value of rating between 0 - 5 of the average total vote
- totalVote: to show how many voters has vote the product
- totalSold: to show how many item has been sold during flash sale event
- itemLeft: to show how many item left during flash sale event

## Details

no details

## Playground

### Cards Default

<Playground>
    <Cards
        title={"Sepeda Motor"}
        urlImage={"https://s3.ap-southeast-1.amazonaws.com/bucket-monggopesen/2019-08-15T07:02:04.092Z_574ae245-06c0-49ae-b4d3-33924223a652"}
        price={25283000.00}
        />
</Playground>

### Cards Default flash sale

<Playground>
    <Cards
        title={"Sepeda Motor"}
        urlImage={"https://s3.ap-southeast-1.amazonaws.com/bucket-monggopesen/2019-08-15T07:02:04.092Z_574ae245-06c0-49ae-b4d3-33924223a652"}
        price={25283000.00}
        totalSold={12}
        itemLeft={88}
        />
</Playground>

### Cards with type="best-seller"

<Playground>
    <Cards
        type="best-seller"
        title={"Sepeda Motor"}
        urlImage={"https://s3.ap-southeast-1.amazonaws.com/bucket-monggopesen/2019-08-15T07:02:04.092Z_574ae245-06c0-49ae-b4d3-33924223a652"}
        price={25283000.00}
    />
</Playground>

### Cards with type="best-seller" discount price

<Playground>
    <Cards
        type="best-seller"
        title={"Sepeda Motor"}
        urlImage={"https://s3.ap-southeast-1.amazonaws.com/bucket-monggopesen/2019-08-15T07:02:04.092Z_574ae245-06c0-49ae-b4d3-33924223a652"}
        price={25283000.00}
        discount="60%"
        discountPrice={300000000.00}
        rateValue={2}
        totalVote={3}
    />
</Playground>

### Cards with type="large"

<Playground>
    <Cards
        type="large"
        title={"Sepeda Motor"}
        urlImage={"https://s3.ap-southeast-1.amazonaws.com/bucket-monggopesen/2019-08-15T07:02:04.092Z_574ae245-06c0-49ae-b4d3-33924223a652"}
        price={25283000.00}
    />
</Playground>

### Cards with type="small"

<Playground>
    <Cards
        type="small"
        title={"Sepeda Motor"}
        urlImage={"https://s3.ap-southeast-1.amazonaws.com/bucket-monggopesen/2019-08-15T07:02:04.092Z_574ae245-06c0-49ae-b4d3-33924223a652"}
        price={25283000.00}
    />
</Playground>
