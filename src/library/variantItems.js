const variantItems =(order)=> {
    return (
      order.reduce((acc, cur) => {
        let arr = acc
        arr.push(cur.value)
        if (cur.key === 'item') {
          arr.push(":")
        }
        return arr
      }, []).join(' ').split(':').filter(e => e !== '').join(', '))
  }
export default variantItems