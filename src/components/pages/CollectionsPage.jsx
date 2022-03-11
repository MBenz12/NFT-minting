import React, { useEffect, useState } from 'react'
import { getNFTItems } from '../../api/wallet/contract';
import CollectionItem from '../collections/CollectionItem'

export default function CollectionsPage() {
  const [items, setItems] = useState([]);
  useEffect(async () => {
    setItems(await getNFTItems());
  }, []);
  return (
    <div>
      <h1>Collections</h1>
      {items.map((item, index) => (<CollectionItem item={item} key={index}/>))}
    </div>
  )
}
