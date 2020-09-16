import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    makeStyles,
} from '@material-ui/core'
import {
    Search,
    AddCircle,
    History,
    Person,
    ExitToApp
} from '@material-ui/icons'
import { push } from 'connected-react-router'

import { TextInput } from '../UIkit'
import { signOut } from '../../reducks/users/operations'

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: 256,
            flexShrink: 0,
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: 256
    },
    searchField: {
        alignItems: "center",
        display: "flex",
        marginLeft: 32,
    }
}))

const ClosableDrawer = (props) => {
    const { container } = props;
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector(state => state)

    const selectMenu = (event, path) => {
        dispatch(push(path))
        props.onClose(event)
    }

    const [ searchKeyword, setSearchKeyword ] = useState("")
    const [ filters, setFilters ] = useState([
        {func: selectMenu, label: "全て", id: "all", value: "/"},
        {func: selectMenu, label: "メンズ", id: "male", value: "/?gender=male"},
        {func: selectMenu, label: "レディース", id: "female", value: "//gender-female"},
    ])

    const menus = [
        {func: selectMenu, label: "商品登録", icon: <AddCircle />, id: "register", value: "/product/edit"},
        {func: selectMenu, label: "注文履歴", icon: <History />, id: "history", value: "/product/history"},
        {func: selectMenu, label: "プロフィール", icon: <Person />, id: "profile", value: "/user/mypage"},
    ]

    const inputSearchKeyword = useCallback((event) => {
        setSearchKeyword(event.target.value)
    },[setSearchKeyword])

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Drawer
                container={container}
                variant="temporary"
                anchor="right"
                open={props.open}
                onClose={(e) => props.onClose(e, false)}
                classes={{ paper: classes.drawerPaper }}
                ModalProps={{ keepMounted: true }}
            >
                <div
                    onClose={(e) => props.onClose(e, false)}
                    onkeyDown={(e) => props.onClose(e, false)}
                >
                    <div className={classes.searchField}>
                        <TextInput
                            type={"text"} fullWidth={false} label={"キーワードを入力"} multiline={false}
                            rows={1} required={false} onChange={inputSearchKeyword} value={searchKeyword}
                        />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {menus.map(menu => (
                                <ListItemIcon button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                                    <ListItem>
                                        {menu.icon}
                                    </ListItem>
                                    <ListItemText primary={menu.label} />
                                </ListItemIcon>
                        ))}
                        <ListItem button key="logout" onClick={() => dispatch(signOut())}>
                            <ListItemIcon>
                                <ExitToApp />
                            </ListItemIcon>
                            <ListItemText primary="ログアウト" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {filters.map(filter => (
                            <ListItem button key={filter.id} onClick={(e) => filter.func(e, filter.value)}>
                                <ListItemText primary={filter.label} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
        </nav>
    )
}

export default ClosableDrawer
