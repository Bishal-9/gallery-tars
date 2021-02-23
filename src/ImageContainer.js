import React, { useState } from 'react'
import './ImageContainer.css'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import { useSpring, animated } from 'react-spring/web.cjs'

function ImageContainer({ imageDetails }) {

    const [open, setOpen] = useState(false)

    const Fade = React.forwardRef(function Fade(props, ref) {
        const { in: open, children, onEnter, onExited, ...other } = props;
        const style = useSpring({
            from: { opacity: 0 },
            to: { opacity: open ? 1 : 0 },
            onStart: () => {
                if (open && onEnter) {
                    onEnter();
                }
            },
            onRest: () => {
                if (!open && onExited) {
                    onExited();
                }
            },
        });

        return (
            <animated.div ref={ref} style={style} {...other}>
                {children}
            </animated.div>
        );
    });

    Fade.propTypes = {
        children: PropTypes.element,
        in: PropTypes.bool.isRequired,
        onEnter: PropTypes.func,
        onExited: PropTypes.func,
    };

    const handleClose = () => {
        setOpen(false);
    };

    const clickHandler = () => {
        setOpen(!open)
    }

    return (
        <div key={imageDetails['id']} className="imageContainer" onClick={clickHandler}>
                <img className="imageContainer__image" src={imageDetails['urls']['thumb']} alt={imageDetails['user']['name']} />
                <h1 className="imageContainer__name">{imageDetails['user']['name']}</h1>
                <h3 className="imageContainer__like">Likes {imageDetails['likes']}</h3>
                <Modal
                    aria-labelledby="spring-modal-title"
                    aria-describedby="spring-modal-description"
                    className="imageContainer__modal"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open} className="imageContainer__fade" >
                        <div className="imageContainer__modalContainer">
                            <img className="imageContainer__modalImage" src={imageDetails['urls']['raw']} alt={imageDetails['user']['name']} />
                            <h2>{imageDetails['user']['name']}</h2>   
                            <p>Likes {imageDetails['likes']}</p>                         
                            <p>{imageDetails['alt_description']}</p>
                            <hr />
                            <div className="imageContainer__modalUser">
                                <Avatar className="imageContainer__avatar" src={imageDetails['user']['profile_image']['medium']} />
                                <p className="imageContainer__userDetails">Instagram - {imageDetails['user']['instagram_username'] == null ? 'Don\'t have account' : imageDetails['user']['instagram_username']}</p>
                                <p className="imageContainer__userDetails">Twitter - {imageDetails['user']['twitter_username'] == null ? 'Don\'t have account' : imageDetails['user']['twitter_username']}</p>
                            </div>
                        </div>
                    </Fade>
                </Modal>
        </div>
    )
}

export default ImageContainer
