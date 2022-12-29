import React, { useEffect, useRef, useState } from 'react';

const MainHeader = ({ roomNameTitle, ROOMID, setInviteBtnLoadingState }) => {
    const [time, setTime] = useState(new Date().toLocaleString());
    const textToCopy = useRef(null);


    useEffect(() => {
        document.addEventListener("click", e => {
            const isDropdownButton = e.target.matches("[data-dropdown-button]")
            if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return

            let currentDropdown;
            if (isDropdownButton) {
                currentDropdown = e.target.closest("[data-dropdown]")
                currentDropdown.classList.toggle("active")
            }

            document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
                if (dropdown === currentDropdown) return
                dropdown.classList.remove("active")
            })
        })
        setInviteBtnLoadingState(false);
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        
        
        return () => {
            clearInterval(interval);
        }
    })

    const copyHandler = () => {
        let text = textToCopy.current
        text.select();

        // Use the execCommand method to copy the text to the clipboard
        document.execCommand("copy");
    }

    return (
        <div className='main-header'>
            <div className='main-header-left'>
                <h3>{roomNameTitle} </h3>
                <div className="header">
                    <div className="dropdown" data-dropdown>
                        <button className="link invite-button" data-dropdown-button>invite</button>
                        <div className="dropdown-menu">
                            <h4>Invitation Code:</h4>
                            <div className='invitation-link-wrapper'>
                                <input value={ROOMID} ref={textToCopy} />
                                <button id='copy-btn' onClick={() => copyHandler()}></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className='current-time'>{time}</p>
        </div>
    )
}

export default MainHeader;