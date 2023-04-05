// Main Navigation Icons
import JoinInnerIcon from '@mui/icons-material/JoinInner';
import JoinFullIcon from '@mui/icons-material/JoinFull';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InfoIcon from '@mui/icons-material/Info';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ContactsIcon from '@mui/icons-material/Contacts';


// Sidebar Navigation Icons
import WebStoriesTwoToneIcon from '@mui/icons-material/WebStoriesTwoTone';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import Groups2TwoToneIcon from '@mui/icons-material/Groups2TwoTone';
import LocalLibraryTwoToneIcon from '@mui/icons-material/LocalLibraryTwoTone';
import SportsEsportsTwoToneIcon from '@mui/icons-material/SportsEsportsTwoTone';
import PollTwoToneIcon from '@mui/icons-material/PollTwoTone';



// User Settings Icons
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';



// Mobile create Icons
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PollIcon from '@mui/icons-material/Poll';


// Login auth Icons

import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';

const NavigationConsts = [
    {
        id: 0,
        Icon: JoinInnerIcon ,
        FilledIcon : JoinFullIcon ,
        label: 'University Join',
        route: '/universe-join',
    },
    {
        id: 1,
        Icon: CurrencyRupeeIcon ,
        FilledIcon : CurrencyRupeeIcon,
        label: 'Donate',
        route: '/donate-to-us',
    },
    {
        id: 2,
        Icon: InfoOutlinedIcon ,
        FilledIcon : InfoIcon,
        label: 'About',
        route: '/about-us',
    },
    {
        id: 3,
        Icon: ContactsOutlinedIcon ,
        FilledIcon : ContactsIcon,
        label: 'Contact',
        route: '/contact-us',
    },
    
]

const SidebarConsts = [
    {
        id: 0,
        Icon: WebStoriesTwoToneIcon ,
        label: 'Posts',
        route: '/all-posts',
    },
    {
        id: 1,
        Icon: EventAvailableTwoToneIcon ,
        label: 'Events',
        route: '/all-events',
    },
    {
        id: 3,
        Icon: Groups2TwoToneIcon ,
        label: 'Clubs',
        route: '/all-clubs',
    },
    {
        id: 4,
        Icon: LocalLibraryTwoToneIcon ,
        label: 'Library Online',
        route: '/library-online',
    },
    {
        id: 5,
        Icon: SportsEsportsTwoToneIcon,
        label: 'Game Zone',
        route: '/game-zone',
    },
    {
        id : 6,
        Icon : PollTwoToneIcon,
        label : 'Polls',
        route : '/polls'
    }
]


const UserSettings = [
    [
        {
            id : 0,
            label : 'Register',
            route : 'universe-join',
            Icon : JoinFullIcon
        },
        {
            id : 1,
            label : 'Login',
            route : 'login',
            Icon : LoginIcon
        }
    ],
    [
        
        {
            id : 2,
            label : 'Logout',
            route : '/logout',
            Icon : LogoutIcon
        }
    ]

]


const MobileCreateConsts = [
    {
        id: 0,
        Icon: LibraryAddIcon ,
        label: 'Posts',
        route: '/all-posts',
    },
    {
        id: 1,
        Icon: EventAvailableIcon ,
        label: 'Events',
        route: '/all-events',
    },
    {
        id: 2,
        Icon: GroupAddIcon ,
        label: 'Clubs',
        route: '/all-clubs',
    },
    
    {
        id : 3,
        Icon : PollIcon,
        label : 'Polls',
        route : '/polls'
    }
]

const LoginAuthConst = [
    {
        id: 0,
        Icon: GoogleIcon ,
        //label: 'Google',
        color : 'green'
    },
    {
        id: 1,
        Icon: GitHubIcon ,
        //label: 'GitHub',
        color : 'black'
    },
    
    
    {
        id : 2,
        Icon : FacebookIcon,
        //label : 'Facebook',
        color : 'blue'
    },
    {
        id: 3,
        Icon: AppleIcon ,
        //label: 'Apple',
        color : 'black'
    },
]


export {
    NavigationConsts,
    SidebarConsts,
    UserSettings,
    MobileCreateConsts,
    LoginAuthConst,
}