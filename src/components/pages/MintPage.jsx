import React, { useEffect, useState } from "react";
import { mintAsset } from "../../api/wallet/contract";
import {
  showWeb3WalletModal,
  getCurrentWalletAddress,
  disconnectWallet,
} from "../../api/wallet/wallet";

function MintPage() {
  const [item, setItem] = useState({
    picture: "",
    name: "",
    description: "",
  });

  const [walletAddress, setWalletAddress] = useState("");

  const onChange = (e, type = 0) => {
    if (type) {
      setItem({ ...item, [e.target.name]: e.target.files[0] });
    } else {
      setItem({
        ...item,
        [e.target.name]: e.target.value,
      });
    }
  };
  const onClickMint = async () => {
    const res = await mintAsset(item);
    if (res.success) {
      setItem({...item, picture: res.picture})
      alert("success!");
    } else {
      console.log(res.error);
    }
  };
  const onClickConnect = async () => {
    showWeb3WalletModal().then(async () => {
      const wallet_address = await getCurrentWalletAddress();
      setWalletAddress(wallet_address);
    });
  };

  useEffect(() => {
    (async () => {
      await disconnectWallet();
    })();
  }, []);
  return (
    <>
      <div>
        <h1>Mint Item</h1>        
        <div>
          <div>Name:</div>
          <input
            type="text"
            name="name"
            onChange={(e) => onChange(e)}
            value={item.name}
          />
        </div>
        <div>
          <div>Description:</div>
          <input
            type="text"
            name="description"
            onChange={(e) => onChange(e)}
            value={item.description}
          />
        </div>
        <div>
          <div>Picture:</div>
          <input type="file" name="picture" onChange={(e) => onChange(e, 1)} />
          <img src={item.picture} alt="" style={{width: '300px', height: '300px'}}/>
        </div>
        <div>
          <button onClick={onClickMint}>Mint</button>
        </div>
      </div>

      <div style={{display: 'none'}}>
        <button onClick={() => onClickConnect()}>Connect to Wallet</button>
        <div>Wallet Address: {walletAddress}</div>
      </div>
    </>
  );
}

export default MintPage;
