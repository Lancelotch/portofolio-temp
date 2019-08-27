---
name: Input
menu: Components
---

import Input from './'
import {Playground, Props } from 'docz'
import "antd/dist/antd.less";

# Input

This is input of Monggopesen

## Properties (props)

<Props of={Input} />

## Purpose Of Props

- type: is used for change the type of the input
- placeholder: is used for adding placeholder in the input
- value: is used to set value in the input
- icon: is used for adding icon as an prefix
- onChange: is used for adding onChangeHandler
- onKeyUp: is used for adding onKeyUpHandler
- size: 'small' is used to set height to 32px
- size: 'medium' is used to set height to 36px
- size: 'large' is used to set height to 48px
- size: 'xlarge' is used to set height to 56px
- disabled: is used for disable the input

## Details

no details

## Playground

## Default Type Input

### Input with Prefix

<Playground>
    <Input placeholder="Some text" icon="mail"  />
</Playground>

### Input size Medium

<Playground>
    <Input placeholder="Some text" size="medium" />
</Playground>

### Input size Large

<Playground>
    <Input placeholder="Some text" size="large" />
</Playground>

### Input size XLarge

<Playground>
    <Input placeholder="Some text" size="xlarge" />
</Playground>

### Input size XLarge with Prefix

<Playground>
    <Input placeholder="Some text" size="xlarge" icon="mail" />
</Playground>

### Input size XLarge with Prefix

<Playground>
    <Input placeholder="Some text" size="xlarge" icon="mail" buttontext="button" />
</Playground>
