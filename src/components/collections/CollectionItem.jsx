import React from 'react'

export default function CollectionItem(props) {
  console.log(props.item);
  const item = props.item;
  return (
    <div>
      <h4>{item.name}</h4>
      <p>{item.description}</p>
      <img src={item.image} alt="" style={{width: '300px', height: '300px'}}/>
    </div>
  )
}
