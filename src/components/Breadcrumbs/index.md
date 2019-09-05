---
name: Breadcrumbs
menu: Components
---

import { Playground, Props } from 'docz'
import Breadcrumbs from './'
import { Breadcrumb } from "antd"
import "antd/dist/antd.less"

# Breadcrumbs

This is Breadcrumbs of Monggopesen Ecommerce

## Properties (props)

<Props of={Breadcrumbs} />

## Purpose Of Props

## Details

no details

## Playground

### Breadcrumbs

<Playground>
{() => {     
let category = [
    {
      label: "mainan & hobi ",
      link: "/category/mainan & hobi"
    },
    {
    label: "sepatu",
    linj: "/category/mainan & hobi/sepatu"
    }
  ]
   return <Breadcrumbs breadcrumbs={category}  />
}}
</Playground>

### Breadcrumbs with type="product"

<Playground>
{() => {     
let category = [
    {
      label: "mainan & hobi ",
      link: "/category/mainan & hobi"
    },
    {
    label: "sepatu",
    link: "/category/mainan & hobi/sepatu"
    },
    {
    label: "Motor supra",
    link: ""
    }
  ]
   return <Breadcrumbs breadcrumbs={category} type="product" />
}}
</Playground>
