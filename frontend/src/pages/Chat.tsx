import React, { useEffect, useState } from 'react';
import Logo from '../assets/images/logo.png'
import { useNavigate } from 'react-router-dom';
import GenderMan from '../assets/images/genderMan.png'
import GenderWoman from '../assets/images/genderWoman.png'
import Home from '../assets/images/home.png'
import ArrowLeft from '../assets/images/arrowLeft.png'
import ArrowRight from '../assets/images/arrowRight.png'
import Stomp from 'stompjs'
import SockJS from "sockjs-client";
import * as api from '../api/api'

const Chat = () => {

    const navigate = useNavigate()

    const [activeVideoIndex, setActiveVideoIndex] = useState(0)

    const videos = [
        'https://images-ssl.gotinder.com/64eb22fae774a40100abace5/640x800_75_4201d662-697d-4228-b04e-029a0705ddd2.webp',
        "https://images-ssl.gotinder.com/64eb22fae774a40100abace5/640x800_75_24fc451c-57cd-42a4-aced-03bc040f3201.webp",
        'https://images-ssl.gotinder.com/64eb22fae774a40100abace5/640x800_75_4201d662-697d-4228-b04e-029a0705ddd2.webp',
    ]

    useEffect(() => {
        console.log("here")
        api.getMessages(1,2)
    }, [api])

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

    const stompClient = Stomp.over(socket)
    const onConnected = () => {
        console.error('stomp init')
        stompClient.subscribe(('/topic'), onMessageReceived)

        const chatMessage = {
            senderId: 1,
            receiverId: 2,
            messageContent: '0000',
            seen: false
        }

        stompClient.send('/app/sendMessage', {}, JSON.stringify(chatMessage))
    }

    const onError = (err: any) => {
        console.error(err)
    }
    stompClient.connect({}, onConnected, onError)

    const onMessageReceived = (payload: any) => {
        // console.log("message: ", JSON.parse(payload.body))
    }

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        //  e.preventDefault()
        // socket.send(JSON.stringify({
        //     senderId: 2,
        //     receiverId: 2,
        //     content: '123'
        // }))
    }


    return (
        <div id='chat'>
            <div className='chat'>
                <div className='upperPart'>
                    <p>You matched with Maryam on 8/23/2023</p>
                    {/* <div></div> */}
                </div>
                <div className='centerPart'>
                    <div className='messageContainer'>
                        <time>7:58</time>
                        <div className='message'>How are you?</div>
                    </div>
                    <div className='messageContainer'>
                        <time>7:58</time>
                        <div className='message'>How are you?</div>
                    </div>
                    <div className='messageContainer'>
                        <time>7:58</time>
                        <div className='message'>How are you?</div>
                    </div>
                    <div className='messageContainer'>
                        <time>7:58</time>
                        <div className='message'>How are you?</div>
                    </div>
                    <div className='dateContainer'>
                        <div className='message'>9/1/2023, 7:58 PM</div>
                    </div>
                    <div className='messageContainer fromHer'>
                        <time>7:58</time>
                        <div className='message'>Fine, you?</div>
                    </div>
                    <div className='messageContainer fromHer'>
                        <time>7:58</time>
                        <div className='message'>Fine, you? Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?Fine, you?</div>
                    </div>
                </div>
                <div className='bottomPart'>
                    <form onSubmit={(e) => sendMessage(e)}>
                        <textarea placeholder='Type a message' name="" id=""></textarea>
                        {/* <button>E</button> */}
                        <button>SEND</button>
                    </form>
                </div>
            </div>


            <div className='partnerInfo'>
                <div className='videoContainer'>
                    {
                        videos.map((item: string, index:number) => {
                            return (
                                activeVideoIndex === index && <video src={'https://www.w3schools.com/tags/movie.ogg'} autoPlay={true} />
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
                        <p className='nameAndAge'>Aleko</p>
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