// EventCreationPage.js
import React, { useEffect, useState } from "react";
import Event from "../components/Event";
import Navigation from "../components/Navigation";


const MyEvents = ({ account, tokenMaster, provider, setAccount, totalOcassions }) => {
    const [occasions, setOccasions] = useState([]);

    const loadOccasions = async () => {
        const signer = await provider.getSigner();
        const userOccasions = await tokenMaster.connect(signer).getUserOccasions();
        
        const occasions = []
        for (var i = 0; i < totalOcassions.length; i++) {
            for (var j = 0; j < userOccasions.length; j++) {
                if (totalOcassions[i][0]['_hex'] == userOccasions[j]['_hex']) {
                    occasions.push(totalOcassions[i])
                }
            }
          }

        setOccasions(occasions);
    };

    useEffect(() => {
        loadOccasions();
    }, []);

    return (
        <>
        <header>
            <Navigation account={account} setAccount={setAccount} />
            <h2 className="header__title">
                <strong>Kettik</strong>
            </h2>
        </header>
        
        <div className="cards">
            
        </div>
        {
            occasions.map((occasion) => (
                <Event occasion={occasion} />
            ))
        }

        </>
    )
};

export default MyEvents;
