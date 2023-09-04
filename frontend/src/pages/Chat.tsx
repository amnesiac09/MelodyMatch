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

const Chat = () => {

    const navigate = useNavigate()

    const [activeVideoIndex, setActiveVideoIndex] = useState(0)
    const [messages, setMessages] = useState([])
    const [sendButtonType, setSendButtonType] = useState("SEND")
    const [currentMessage, setCurrentMessage] = useState("")

    const dummyMessageRef = useRef() as MutableRefObject<HTMLDivElement>;
    const textareaRef = useRef() as MutableRefObject<HTMLTextAreaElement>;

    // const {stompClient} = useSelector((state: RootState) => state.UsersReducer)
    const [stompClient, setStompClient] = useState(null)

    const videos = [
        'https://images-ssl.gotinder.com/64eb22fae774a40100abace5/640x800_75_4201d662-697d-4228-b04e-029a0705ddd2.webp',
        "https://images-ssl.gotinder.com/64eb22fae774a40100abace5/640x800_75_24fc451c-57cd-42a4-aced-03bc040f3201.webp",
        'https://images-ssl.gotinder.com/64eb22fae774a40100abace5/640x800_75_4201d662-697d-4228-b04e-029a0705ddd2.webp',
    ]


    const getMessages = async () => {
        let res: any = await api.getMessages('x', 'yaa')
        setMessages(res)
    }

    useEffect(() => {
        // let res: any
        getMessages()

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
        console.log(2)
        const onConnected = () => {
            (stompClient as any).subscribe(('/topic'), onMessageReceived)
        }

        const onError = (err: any) => {
            console.error(err)
        }
        (stompClient as any).connect({}, onConnected, onError)

        const onMessageReceived = (payload: any) => {
            console.log(payload)
            // console.log("message: ", JSON.parse(payload.body))
        }

        setStompClient(stompClient as any)
    }, [])

    useEffect(() => {
        dummyMessageRef.current.scrollIntoView()
    }, [messages])


    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = {
            senderUsername: 'yaa',
            receiverUsername: 'x',
            messageContent: textareaRef.current.value,
            seen: false
        };
        await (stompClient as any).send('/app/sendMessage', {}, JSON.stringify(data))
        await getMessages()
        // setMessages(currentMessage as any)
        setCurrentMessage('')
    }

    const editMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSendButtonType("SEND")
        setCurrentMessage('')
    }

    const setEditingMessage = (text: string) => {
        setCurrentMessage(text)
        textareaRef.current.focus()
        setSendButtonType("EDIT")
    }


    return (
        <div id='chat'>
            <div className='chat'>
                <div className='upperPart'>
                    <p>You matched with Maryam on 8/23/2023</p>
                    {/* <div></div> */}
                </div>
                <div className='centerPart'>
                    {/* <div className='dateContainer'>
              <div className='message'>9/1/2023, 7:58 PM</div>
            </div> */}
                    {/* <div className='messageContainer'>
              <img src={Delete}/>
              <img src={Edit}/>
              <time>7:58</time>
              <div className='message'>Maryam!</div>
            </div>
            <div className='messageContainer'>
              <img src={Delete}/>
              <img src={Edit}/>
              <time>7:58</time>
              <div className='message'>How are you?</div>
            </div>
            <div className='messageContainer fromHer'>
              <time>7:58</time>
              <div className='message'>Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?</div>
            </div>
            <div className='messageContainer isLast'>
              <img src={Delete}/>
              <img onClick={() => setEditingMessage('Great, what about your musical career?')} src={Edit}/>
              <time>7:58</time>
              <div className='message'>Great, what about your musical career?</div>
            </div> */}
                    {
                        messages.map((item: any, i) => {
                            let isMine = item.senderUsername === 'yaa'
                            let isLast = i === messages.length - 1
                            return (
                                <div className={`messageContainer ${isMine ? "" : "fromHer"} ${(isLast && isMine) ? "isLast" : ""}`}>
                                    {isMine && <>
                                        <img src={Delete}/>
                                        <img src={Edit} onClick={() => setEditingMessage(item.messageContent)} />
                                    </>
                                    }
                                    <time>7:58</time>
                                    <div className='message'>{item.messageContent}</div>
                                </div>
                            )
                        })
                    }
                    <div style={{ float:"left", clear: "both" }}
                         ref={dummyMessageRef}>
                    </div>
                </div>
                <div className='bottomPart'>
                    <form onSubmit={(e) => sendButtonType === "SEND" ? sendMessage(e) : editMessage(e)}>
                        <textarea ref={textareaRef} placeholder='Type a message' name="" id="" value={currentMessage} onChange={(e: React.FormEvent) => setCurrentMessage((e.target as HTMLTextAreaElement).value)}></textarea>
                        <button className={`messageContainer ${currentMessage !== '' ? "active" : ""}`}>{sendButtonType === "SEND" ? "send" : "save"}</button>
                    </form>
                </div>
            </div>


            <div className='partnerInfo'>
                <div className='videoContainer'>
                    {
                        videos.map((item: string, index:number) => {
                            return (
                                activeVideoIndex === index && <img src={'https://images.pexels.com/photos/10434979/pexels-photo-10434979.jpeg?cs=srgb&dl=pexels-cottonbro-studio-10434979.jpg&fm=jpg'} />
                                // <img src={item} alt="" className={activeVideoIndex === index ? 'active': ''} />
                            )
                        })
                    }
                    <div className='arrows'>
                        <div onClick={() => setActiveVideoIndex(activeVideoIndex-1)} className={`arrowLeft ${activeVideoIndex !== 0 ? 'active' : ''}`}>
                            <img src={ArrowLeft} alt="" />
                        </div>
                        <div onClick={() => setActiveVideoIndex(activeVideoIndex+1)} className={`arrowRight ${activeVideoIndex !== videos.length - 1 ? 'active': ''}`}>
                            <img src={ArrowRight} alt="" />
                        </div>
                    </div>
                    <div className='bullets'>
                        {
                            videos.map((item: string, index:number) => {
                                return (
                                    <div onClick={() => setActiveVideoIndex(index)} className={activeVideoIndex === index ? 'active' : ''}></div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='info'>
                    <div className='basic'>
                        <p className='nameAndAge'>Maryam</p>
                        <div className='gender'>
                            <img src={GenderMan} alt="" />
                            <p>Man</p>
                        </div>
                        <div className='destination'>
                            <img src={Home} alt="" />
                            <p>Lives in Tbilisi</p>
                        </div>
                    </div>
                    <div className='more'>
                        <div className='passions'>
                            <p>Passions</p>
                            <div>
                                <div>guitar</div><div>violin</div><div>singing</div><div>coffee</div><div>sneakers</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Chat;