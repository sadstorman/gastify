import React, { useRef, useState } from 'react'
import { Overlay } from 'react-bootstrap';

export const Tooltip = () => {

    const [show, setShow] = useState(false);
    const target = useRef(null);

    return (
        <>
            <button className='btn  button-tooltip btn-sm' ref={target} onClick={() => setShow(!show)}>
                <i className="bi bi-question-lg"></i>
            </button>
            <Overlay target={target.current} show={show} transition={true} placement="right" rootCloseEvent='click' rootClose={true}>
                {({ placement, arrowProps, show: _show, popper, ...props }) => (
                    <div
                        {...props}
                        style={{
                            position: 'absolute',
                            backgroundColor: '#00295a',
                            padding: '4px 10px',
                            marginLeft: '4px',
                            color: 'white',
                            borderRadius: 4,
                            ...props.style,
                        }}
                    >
                        <a><b>One Click</b>: delete trade</a>
                        <br/>
                        <a><b>Double Click</b>: Edit trade</a>
                    </div>
                )}
            </Overlay>
        </>
    );
}
