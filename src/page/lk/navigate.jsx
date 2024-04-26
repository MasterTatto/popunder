import React, {useState} from 'react';
import {Collapse, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {useLocation, useNavigate} from "react-router-dom";

const NavigateItem = ({item}) => {
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const [open, setOpen] = useState(true);

    const handleClick = (link) => {
        console.log(link)
        console.log(pathname)
        if (link) {
            navigate(link)
        } else {
            setOpen(!open);
        }

    };

    return (
        <List>
            <ListItemButton selected={pathname?.includes(item?.link)} onClick={() => handleClick(item?.link)}>
                <ListItemIcon>
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title}/>
                {item.sub_data && <>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </>}
            </ListItemButton>
            {item.sub_data ?
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {item.sub_data?.map((sub, inx) => {
                            return <ListItemButton selected={pathname?.includes(sub?.link)} key={inx} sx={{pl: 4}}
                                                   onClick={() => handleClick(sub?.link)}>
                                <ListItemIcon>
                                    {sub.icon}
                                </ListItemIcon>
                                <ListItemText primary={sub?.title}/>
                            </ListItemButton>
                        })}
                    </List>
                </Collapse>
                : null}

        </List>
    );
};

export default NavigateItem;
