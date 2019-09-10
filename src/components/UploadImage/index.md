---
name: Upload (Need Auth)
menu: Components
---

import UploadImage from './'
import {useState} from 'react'
import {Playground, Props } from 'docz'
import "antd/dist/antd.less";

# Upload (Need Auth)

This is Upload of Monggopesen

## Properties (props)

<Props of={UploadImage} />

## Purpose Of Props

-

## Details

no details

## Playground

## Products type Upload as Default

<Playground>
  {()=>{
  const [allData, setAllData] = useState({});
  return (
    <UploadImage
      allData={allData}
      setAllData={setAllData}
    />
    )
  }}
</Playground>

## Avatar Type Upload

<Playground>
  {()=>{
  const [allData, setAllData] = useState({});
  return (
    <UploadImage
      type="avatar"
      allData={allData}
      setAllData={setAllData}
    />
    )
  }}
</Playground>
