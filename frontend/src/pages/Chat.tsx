import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import Logo from '../assets/images/logo.png'
import { useNavigate } from 'react-router-dom';
import GenderMan from '../assets/images/genderMan.png'
import GenderWoman from '../assets/images/genderWoman.png'
import Home from '../assets/images/home.png'
import ArrowLeft from '../assets/images/arrowLeft.png'
import ArrowRight from '../assets/images/arrowRight.png'
import Edit from '../assets/images/edit.png'
import Delete from '../assets/images/delete.png'
import Stomp from 'stompjs'
import SockJS from "sockjs-client";
import * as api from '../api/api'
import { useSelector } from 'react-redux';
import { formatDateToAMPM } from '../utils/utils';

const Chat = () => {

    const navigate = useNavigate()

    const [activeMediaIndex, setActiveMediaIndex] = useState(0)
    const [messages, setMessages] = useState([])
    const [sendButtonType, setSendButtonType] = useState("SEND")
    const [currentMessage, setCurrentMessage] = useState(
        {
            id: 0,
            senderUsername: "",
            receiverUsername: "",
            messageContent: "",
            sentTime:	"",
            seen: false
        }
        // null
    )

    const dummyMessageRef = useRef() as MutableRefObject<HTMLDivElement>;
    const textareaRef = useRef() as MutableRefObject<HTMLTextAreaElement>;

    const {isLoggedIn, userInfo, activeUser} = useSelector((state: RootState) => state.UsersReducer)
    const [stompClient, setStompClient] = useState(null)


    const getMessages = async () => {
        let res: any = await api.getMessages((userInfo as any).username, (activeUser as any)?.matchedUser.username)
        setMessages(res)
    }

    useEffect(() => {
        // let res: any
        const socket = new SockJS('http://localhost:8080/ws');
        // socket.onopen = function() {
        //     console.log('successful');
        // };

        // socket.onclose = function() {
        //     console.log('unsuccessful');
        // };

        // socket.onmessage = function(e) {
        //     console.log('message', e.data);
        //     socket.close();
        // };

        let stompClient = Stomp.over(socket)
        const onConnected = () => {
            (stompClient as any).subscribe(('/topic'), onMessageReceived)
        }

        const onError = (err: any) => {
            console.error(err)
        }
        (stompClient as any).connect({}, onConnected, onError)

        const onMessageReceived = (payload: any) => {
            console.log(JSON.parse(payload.body))
            setMessages(JSON.parse(payload.body))
            console.log(messages)
        }

        setStompClient(stompClient as any)
    }, [])

    useEffect(() => {
        dummyMessageRef.current.scrollIntoView()
    }, [messages])

    useEffect(() => {
        getMessages()
    }, [activeUser])


    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const data = {
            senderUsername: (userInfo as any).username,
            receiverUsername: (activeUser as any)?.matchedUser.username,
            messageContent: textareaRef.current.value,
            seen: false
        };
        await (stompClient as any).send('/app/sendMessage', {}, JSON.stringify(data))
        // let b = await getMessages()
        // console.log(a,b)
        // setMessages({
        //   ...messages,

        // })
        setCurrentMessage(null as any)
        textareaRef.current.value = ''
    }

    const editMessage = async (e: React.FormEvent<HTMLFormElement>, shouldDelete:boolean) => {
        console.log("here")
        e.preventDefault()
        const data = {
            messageId: (currentMessage as any).id,
            content: (currentMessage as any).messageContent,
            delete: shouldDelete,
            senderNickname: (userInfo as any).username,
            receiverNickname: (activeUser as any)?.matchedUser.username,
        }
        await api.editMessage(data)
        // await getMessages()
        setSendButtonType("SEND")
        setCurrentMessage(null as any)
        textareaRef.current.value = ''
    }

    const deleteMessage = async (id: number) => {
        const data = {
            messageId: id,
            content: '',
            delete: true,
            senderNickname: (userInfo as any).username,
            receiverNickname: (activeUser as any)?.matchedUser.username,
        }
        await api.editMessage(data)
        // await getMessages()
    }

    const setEditingMessage = (item: any) => {
        setCurrentMessage(item)
        textareaRef.current.focus()
        setSendButtonType("EDIT")
    }

    return (
        <div id='chat'>
            <div className='chat'>
                <div className='upperPart'>
                    <p>{(activeUser as any)?.matchedUser.username}</p>
                    {/* <div></div> */}
                </div>
                <div className='centerPart'>
                    {/* <div className='dateContainer'>
              <div className='message'>9/1/2023, 7:58 PM</div>
            </div> */}
                    {
                        messages.length > 0 && messages.map((item: any, i) => {
                            let isMine = item.senderUsername === (userInfo as any).username
                            let isLast = i === messages.length - 1
                            let isDeleted = item.messageType === "DELETED"
                            return (
                                <div className={`messageContainer ${isMine ? "" : "fromHer"} ${(isLast && isMine) ? "isLast" : ""}`}>
                                    {(isMine && !isDeleted) && <>
                                        <img src={Delete} onClick={(e) => deleteMessage(item.id)}/>
                                        <img src={Edit} onClick={() => setEditingMessage(item)} />
                                    </>
                                    }
                                    <time>{formatDateToAMPM(item.sentTime)}</time>
                                    <div className={`message ${isDeleted ? "deleted" : ""}`}>{item.messageContent}</div>
                                </div>
                            )
                        })
                    }
                    <div style={{ float:"left", clear: "both" }}
                         ref={dummyMessageRef}>
                    </div>
                </div>
                <div className='bottomPart'>
                    <form onSubmit={(e) => sendButtonType === "SEND" ? sendMessage(e) : editMessage(e, false)}>
                        <textarea ref={textareaRef} placeholder='Type a message' name="" id="" value={(currentMessage as any)?.messageContent} onChange={(e: React.FormEvent) => setCurrentMessage({...currentMessage as any, messageContent : (e.target as HTMLTextAreaElement).value})}></textarea>
                        <button className={`messageContainer ${(currentMessage as any)?.messageContent !== '' ? "active" : ""}`}>{sendButtonType === "SEND" ? "send" : "save"}</button>
                    </form>
                </div>
            </div>


            <div className='partnerInfo'>
                {activeUser && <>
                    <div className='videoContainer'>
                        {
                            (activeUser as any).matchedUser.mediaFilenames.map((item: string, index:number) => {
                                console.log(item)
                                let isVideo = item.includes('mp4') || item.includes('wav')
                                return (
                                    activeMediaIndex === index && ( !isVideo ?
                                            <img
                                                src={item}
                                                key={index}
                                            />
                                            :
                                            <video
                                                autoPlay
                                                key={index}
                                                src={item}
                                            >
                                            </video>
                                    )
                                )
                            })
                        }
                        <div className='arrows'>
                            <div onClick={() => setActiveMediaIndex(activeMediaIndex-1)} className={`arrowLeft ${activeMediaIndex !== 0 ? 'active' : ''}`}>
                                <img src={ArrowLeft} alt="" />
                            </div>
                            <div onClick={() => setActiveMediaIndex(activeMediaIndex+1)} className={`arrowRight ${activeMediaIndex !== (activeUser as any).matchedUser.mediaFilenames.length - 1 ? 'active': ''}`}>
                                <img src={ArrowRight} alt="" />
                            </div>
                        </div>
                        <div className='bullets'>
                            {
                                (activeUser as any).matchedUser.mediaFilenames.map((item: string, index:number) => {
                                    return (
                                        <div onClick={() => setActiveMediaIndex(index)} className={activeMediaIndex === index ? 'active' : ''}></div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='info'>
                        <div className='basic'>
                            <p className='nameAndAge'>{(activeUser as any).matchedUser.name}</p>
                            <div className='gender'>
                                <img src={(activeUser as any).gender === "MALE" ? GenderMan : GenderWoman} alt="" />
                                <p>{(activeUser as any).gender === "MALE" ? 'Man' : 'Woman'}</p>
                            </div>
                            <div className='destination'>
                                <img src={Home} alt="" />
                                <p>Lives in {(activeUser as any).matchedUser.location}</p>
                            </div>
                        </div>
                        <div className='more'>
                            <div className='passions'>
                                <p>Favorite Genre</p>
                                <div>
                                    {(activeUser as any).matchedUser.musicalGenres.map((item: any) => {
                                        return (
                                            <div>{item}</div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className='passions'>
                                <p>Favorite Instrument</p>
                                <div>
                                    {(activeUser as any).matchedUser.musicalInstruments.map((item: any) => {
                                        return (
                                            <div>{item}</div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className='passions'>
                                <p>Bio</p>
                                <div>
                                    {(activeUser as any).matchedUser.bio}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                }
            </div>
        </div>
    )
};

export default Chat;