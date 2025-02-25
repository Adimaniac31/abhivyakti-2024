import React from 'react';
import LogoComponent from './LogoComponent';
import { useNavigate } from 'react-router-dom';

function StickyHeader(props) {
    const navigateTo = useNavigate();

    const innerComp = (type) => {
        if (type === 1) {
            return <ul style={{display:'flex', flexDirection:'column', justifyContent:'center', padding:'0px'}}>
                <li onClick={() => navigateTo('/home')}>HOME</li>
                <li onClick={props.handleSignout}>SIGN OUT</li>
            </ul>
        } else if (type === 2) {
            return <ul>
                <li onClick={() => document.querySelectorAll('.liner')[1].scrollIntoView(1)}>ORGANIZING TEAM SAC</li>
                <li onClick={() => document.querySelectorAll('.liner')[2].scrollIntoView(1)}>CLUBS</li>
                <li onClick={() => document.querySelectorAll('.liner')[3].scrollIntoView(1)}>TEAMS</li>
            </ul>
        } else return <ul></ul>
    }
    return (
        <div className={`pro_sticky_header`} style={{ height: `${props.type === 1 ? "" : ""}` }} >
            <div div className='top' >
                <div className="left" style={{ justifyItems: "center", display: "flex" }}>
                    <ul>
                        <LogoComponent  />
                        <li><div></div></li>
                        <li onClick={()=>window.open("https://www.instagram.com/abhivyakti_iiitn/", '_blank', 'noopener,noreferrer')}><i className="fa-brands fa-instagram"></i></li>
                            <li onClick={()=>window.open("https://www.linkedin.com/in/abhivyakti-iiitn/", '_blank', 'noopener,noreferrer')}><i className="fa-brands fa-linkedin"></i></li>
                    </ul>
                </div>
                <div className="right" style={{height:'100%', alignSelf:'center'}}>
                    {innerComp(props.type)}
                </div>
            </div >
        </div >
    )
}

export default StickyHeader