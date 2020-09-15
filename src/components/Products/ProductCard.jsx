import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import NoImage from '../../assets/img/src/no_image.png'
import { getUserRole } from "../../reducks/users/selectors";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { deleteProduct } from "../../reducks/products/operations";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            margin: 8,
            width: 'calc(50% - 16px)'
        },
        [theme.breakpoints.up('sm')]: {
            margin: 16,
            width: 'calc(33.333% - 32px)'
        }
    },
    content: {
        display: 'flex',
        padding: '16 8',
        textAlign: 'left',
        '&:last-child': {
            paddingBottom: 16
        }
    },
    icon: {
        marginRight: 0,
        marginLeft: 'auto'
    },
    media: {
        height: 0,
        paddingTop: '100%'
    },
    price :{
        color: theme.palette.secondary.dark,
        fontSize: 16
    },
    productName: {
        boxOrient: 'vertical',
        display: '-wedkit-box',
        fontSize: 14,
        lineHeight: '18px',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            height: 36,
            lineClamp: 2,
        },
        [theme.breakpoints.up('md')]: {
            height: 18,
            lineClamp: 1,
        }
    }
}))

const ProductCard = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const userRule = getUserRole(selector)
    const isAdministrator = (userRule === "administrator")

    const images = (props.images.length > 0) ? props.images : [NoImage]
    const price = props.price.toLocaleString()

    const [ anchorEL, setAnchorEL ] = React.useState(null)

    const handleClick = (event) => {
        setAnchorEL(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEL(null)
    }

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={images[0].path}
                title=""
                onClick={() => dispatch(push('/product/' + props.id))}
            />
            <CardContent className={classes.content}>
                <div cnClick={() => dispatch(push('/product/' + props.id))}>
                    <Typography className={classes.productName} color="textSecondary" component="p">
                        {props.name}
                    </Typography>
                    <Typography className={classes.price} component="p">
                        ¥{price}
                    </Typography>
                </div>
                {isAdministrator && (
                    <>
                        <IconButton className={classes.icon} onClick={handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEL}
                            keepMounted
                            open={Boolean(anchorEL)}
                            onClick={handleClose}
                        >
                            <MenuItem
                                onClick={() => {
                                    dispatch(push('/product/edit/' + props.id))
                                    handleClick()
                                }}
                            >
                                編集する
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    dispatch(deleteProduct(props.id))
                                    handleClose()
                                }}
                            >
                                削除する
                            </MenuItem>
                        </Menu>
                    </>
                )}
            </CardContent>
        </Card>
    )
}

export default ProductCard
