---
name: Button
menu: Components
---

import { Playground, Props } from 'docz'
import Button from './'
import "antd/dist/antd.less"

# Button

This is button of Monggopesen Ecommerce

## Properties (props)

<Props of={Button} />

## Purpose Of Props

- Type: 'primary' is used for regular button
- Type: 'secondary' is used for first alternative after regular button
- Width: 'default' is used for default width button
- Width: 'full' is used for full width 100% button
- Margin 'small or large' used if there is a distance between the button and other items
- Disabled: 'boolean TRUE or FALSE'

## Details

no details

## Playground

### Button (Default)

<Playground>
    <Button>Click Me</Button>
</Playground>

### Button Primary & Size Large

<Playground>
    <Button type="primary" size="large">Click Me</Button>
</Playground>

### Button Primary & Size Small

<Playground>
    <Button type="primary" size="small">Click Me</Button>
</Playground>

### Button Disabled & Size Large

<Playground>
<Button disabled={true} size="large">Disabled</Button>
</Playground>

### Button Primary & Width Full

<Playground>
    <Button type="primary" width="full">Click Me</Button>
</Playground>

### Button Primary & Width 90

<Playground>
    <Button type="primary" width="90">Click Me</Button>
</Playground>

### Button Secondary

<Playground>
    <Button type="secondary">Click Me</Button>
</Playground>

### Button Danger

<Playground>
    <Button type="danger">Click Me</Button>
</Playground>

### Button Link

<Playground>
    <Button type="link">Click Me</Button>
</Playground>

### Button White

<Playground>
    <Button type="white">Click Me</Button>
</Playground>

### Button Teal

<Playground>
    <Button type="teal">Click Me</Button>
</Playground>

### Button Grey

<Playground>
    <Button type="grey">Click Me</Button>
</Playground>

### Button Ghost

<Playground>
    <Button type="ghost">Click Me</Button>
</Playground>
