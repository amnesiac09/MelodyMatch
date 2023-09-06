import React from 'react';
import Close from '../assets/images/close.png'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editUser } from '../api/api';
import * as api from '../api/api'

const NewMatchesPopup: React.FC<{
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    newMatchesAmount: number
}> = ({
          setVisible,
          newMatchesAmount
      }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {userInfo} = useSelector((state: RootState) => state.UsersReducer)

    const handleClose = async (shouldNavigate?: boolean) => {

        const data = {
            "id": (userInfo as any).id,
            "username": (userInfo as any).username,
            "password": (userInfo as any).password,
            "name": (userInfo as any).name,
            "gender": (userInfo as any).gender,
            "location": (userInfo as any).location,
            "email": (userInfo as any).email,
            "bio": (userInfo as any).bio,
            "likedUsers": (userInfo as any).likedUsers,
            "matchedUsers": (userInfo as any).matchedUsers,
            "mediaFilenames": (userInfo as any).mediaFilenames,
            "musicalInstruments": (userInfo as any).musicalInstruments,
            "musicalGenres": (userInfo as any).musicalGenres,
            "newMatchedUsersCount": 0
        }

        await api.editUser(data).then((res) => {
            if(res.data) {
                console.log(res.data)
                //   dispatch(editUser(res.data) as any);
            }
        })

        setVisible(false)

        if(shouldNavigate) {
            navigate('/chat')
        }
    }

    return (
        <div id='newmatches_popup' onClick={() => {}}>
            <div>
                <button className='closeButton' onClick={() => handleClose()}>
                    <img src={Close} />
                </button>
                <div className='texts'>
                    <p>Good News!</p>
                    <p>You have {newMatchesAmount} new matches</p>
                </div>
                <button onClick={() => handleClose(true)} className='seeButton'>lets see them</button>
            </div>
        </div>
    )
};

export default NewMatchesPopup;