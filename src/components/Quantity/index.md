---
name: Quantity
menu: Components
---

import { Playground, Props } from 'docz'
import Quantity from './'
import Input from './'
import "antd/dist/antd.less"

# Quantity

This is Quantity of Monggopesen Ecommerce

## Properties (props)

<Props of={Quantity} />

## Purpose Of Props



## Details

no details

## Playground

### Quantity

<Playground>
    {() => {
        function updateQuantity(value) {
            alert(value);
        }
        return <Quantity stock={10} updateQuantity={updateQuantity}/>
    }}
</Playground>

