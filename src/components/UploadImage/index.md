---
name: Upload (Need Auth)
menu: Components
---
import {Playground, Props } from 'docz'
import UploadImage from './'
import {useState} from 'react'
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

## Default type Upload

<Playground>
  {()=>{
  const [payload, setPayload] = useState({});
  function onSuccess(response) {
    setPayload({
      ...payload,
      photoUrl: response
    })
  }
  return (
    <UploadImage
      onSuccess={onSuccess}
      initialValue={payload.photoUrl}
    />
    )
  }}
</Playground>

## Avatar Type Upload

<Playground>
  {()=>{
  const [payload, setPayload] = useState({});
  function onSuccess(response) {
    setPayload({
      ...payload,
      photoUrl: response
    })
  }
  return (
    <UploadImage
      type="avatar"
      onSuccess={onSuccess}
      initialValue={payload.photoUrl}
    />
    )
  }}
</Playground>
