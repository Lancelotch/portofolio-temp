---
name: Alert
menu: Components
---

import Alert from './'
import { Playground, Props } from 'docz'
import { notification, Icon } from 'antd'
import Button from '../Button'
import { useRootContext } from "../../hoc/RootContext";
import "antd/dist/antd.less"
import { useState } from 'react'

# Alert

This is alert of Monggopesen

## Properties (props)

<Props of={Alert} />

## Details

no details

## Playground

### Default Alert
<Playground>
{() => {
  const [show, setShow] = useState(false)
  function openAlert () {
    setShow(!show)
  }
  return (
    <>
      {
        show &&
        <Alert  title={'yang penting santuyyy'} />
      }
      <Button onClick={() => openAlert ()}  >Click me</Button>
    </>
  )
}}
</Playground>

### Animation moveBottom Alert with icon and description

<Playground>
  {() => {
    const [show, setShow] = useState(false)
    function openAlert () {
      setShow(!show)
    }
    return (
      <>
        {
          show &&
          <Alert 
            showIcon={true}  
            title={'santuyyy'}
            description={'yang penting santuy'}
            animation="fall"
            type="info"
          />
        }
        <Button onClick={() => openAlert ()}  >Click me</Button>
      </>
    )
  }}
</Playground>