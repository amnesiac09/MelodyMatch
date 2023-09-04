import React from 'react';
import Close from '../assets/images/close.png'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NewMatchesPopup: React.FC<{
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    newMatchesAmount: number
}> = ({
          setVisible,
          newMatchesAmount
      }) => {

    const navigate = useNavigate()

    return (
        <div id='newmatches_popup' onClick={() => {}}>
            <div>
                <button className='closeButton' onClick={() => setVisible(false)}>
                    <img src={Close} />
                </button>
                <div className='texts'>
                    <p>Good News!</p>
                    <p>You have {newMatchesAmount} new matches</p>
                </div>
                <button onClick={() => {setVisible(false); navigate('/chat')}} className='seeButton'>lets see them</button>
            </div>
        </div>
    )
};

export default NewMatchesPopup;