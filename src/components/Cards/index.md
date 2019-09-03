---
name: Cards
menu: Components
---

import { Playground, Props } from 'docz'
import Cards from './'
import { Col, Row } from "antd";

# Cards

This is Cards of Monggopesen

## Properties (props)

<Props of={Cards} />

## Purpose Of Props

- Type: 'popular','bestSeller','recommend','default'<br/>
- urlImage: "https://s3.ap-southeast-1.amazonaws.com/bucket-monggopesen/"<br/>
-title : 'Ini Cards'<br/>
-price : '2343253'<br/>
-playButton : 'from api respon (http://bizcommon.alicdn.com/7RLWSSwpa3nDfyuh3c1/zIm12hXlPCkKtisrfUo%40%40hd.mp4)'

## Details

no details

## Playground

### Cards Default
<Playground>
<Cards
    title={"Sepeda Motor"}
    urlImage={"https://s3.ap-southeast-1.amazonaws.com/bucket-monggopesen/2019-08-15T07:02:04.092Z_574ae245-06c0-49ae-b4d3-33924223a652"}
    price={25283000.00}/>
</Playground>

### Cards with type="bestSeller" playButton="string"

<Playground>
<Cards
    type="bestSeller"
    title={"Sepeda Motor"}
    urlImage={"https://s3.ap-southeast-1.amazonaws.com/bucket-monggopesen/2019-08-15T07:02:04.092Z_574ae245-06c0-49ae-b4d3-33924223a652"}
    price={25283000.00}
    playButton="http://bizcommon.alicdn.com/7RLWSSwpa3nDfyuh3c1/zIm12hXlPCkKtisrfUo%40%40hd.mp4"
/>
</Playground>

### Cards with type="popular" border="active"

<Playground>
<Cards
    type="popular"
    border="active"
    title={"Sepeda Motor"}
    urlImage={"https://s3.ap-southeast-1.amazonaws.com/bucket-monggopesen/2019-08-15T07:02:04.092Z_574ae245-06c0-49ae-b4d3-33924223a652"}
    price={25283000.00}
/>
</Playground>

### Cards with type="recommend"

<Playground>
<Cards
    type="recommend"
    title={"Sepeda Motor"}
    urlImage={"https://s3.ap-southeast-1.amazonaws.com/bucket-monggopesen/2019-08-15T07:02:04.092Z_574ae245-06c0-49ae-b4d3-33924223a652"}
    price={25283000.00}
/>
</Playground>