import React from 'react';
import {Box, IconButton, Modal, Stack, useMediaQuery} from "@mui/material";
import s from './styles.module.css'
import CloseIcon from '@mui/icons-material/Close';

const style = {
    paddingRight: '20px',
    maxHeight: '90%',
    height: 'fit-content',
    paddingBottom: '10px',
    overflow: 'auto',
    // background:'#fff'
    // paddingLeft: '1px'
};

const styleS = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '440px',
    width: '100%',
    padding: '24px',
    paddingRight: '4px',
    background: '#fff',
    borderRadius: '0px',
    maxHeight: '98%',
}

const full_height = {
    minHeight: '100dvh',
    maxHeight: '100dvh',
    height: '100dvh',
    maxWidth: '100%',
    borderRadius: '0px',
    padding: '0',
    paddingRight: '0',
    paddingBottom: '0'
}
const full_heightS = {
    maxHeight: '100%',
    height: '100%',
    maxWidth: '100%',
    overflow: 'unset',
    overflowX: 'auto',
    paddingRight: '0',
    paddingBottom: ''
}

const ModalWrapper = ({children, width = '440px', height = 'fit-content', open, onClose, title = ''}) => {
    const query_700 = useMediaQuery('(max-width:780px)');
    return (
        <Modal
            sx={{
                zIndex: 20,

            }}
            open={open}
            onClose={onClose}
        >
            <Stack sx={query_700 ? {...styleS, ...full_height} : {
                ...styleS,
                maxWidth: width,
                height: height
            }}>
                <Box sx={query_700 ? {...style, ...full_heightS} : {...style, height: '100%', maxHeight: '100%'}}>
                    {title && <div className={s.modal_top}>
                        <p className={s.title}>{title}</p>
                        <IconButton onClick={onClose}>
                            <CloseIcon/>
                        </IconButton>
                    </div>}
                    {children}
                </Box>
            </Stack>
        </Modal>
    );
};

export default ModalWrapper;
