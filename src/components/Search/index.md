---
name: Search
menu: Components
---

import Search from './'
import {Playground, Props } from 'docz'
import "antd/dist/antd.less";

# Search

This is Search of Monggopesen

## Properties (props)

<Props of={Search} />

## Purpose Of Props

- placeholder: is used for adding placeholder in the search
- onChange: is used for adding onChangeHandler
- onSearch: is used for adding onSearchHandler
- size: 'medium' is used to set height to 36px
- size: 'large' is used to set height to 48px

## Details

no details

## Playground

### Search with Placeholder

<Playground>
    <Search placeholder="Some text" />
</Playground>

### Search size Medium

<Playground>
    <Search placeholder="Some text" size="medium" />
</Playground>

### Search size Large

<Playground>
    <Search placeholder="Some text" size="large" />
</Playground>
