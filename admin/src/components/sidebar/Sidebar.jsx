import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  PermIdentity,
  MovieOutlined,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  List,
  Add,
} from "@material-ui/icons";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
   
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <NavLink to="/" className="link"  activeClassName="active">
              <li className="sidebarListItem">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </NavLink>

            <NavLink to="/users" className="link"  activeClassName="active">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </NavLink>

            <NavLink to="/movies" className="link"  activeClassName="active">
              <li className="sidebarListItem">
                <MovieOutlined className="sidebarIcon" />
                Movies
              </li>
            </NavLink>

            <NavLink to="/lists" className="link"  activeClassName="active">
              <li className="sidebarListItem">
                <List className="sidebarIcon" />
                Lists
              </li>
            </NavLink>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Action Menu</h3>
          <ul className="sidebarList">
            <NavLink to="/newuser" className="link"  activeClassName="active">
              <li className="sidebarListItem">
                <Add className="sidebarIcon" />
                New User
              </li>
            </NavLink>

            <NavLink to="/newmovie" className="link"  activeClassName="active">
              <li className="sidebarListItem">
                <Add className="sidebarIcon" />
                New Movie
              </li>
            </NavLink>

            <NavLink to="/createnewlist" className="link"  activeClassName="active">
              <li className="sidebarListItem">
                <Add className="sidebarIcon" />
                New List
              </li>
            </NavLink>

            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Transactions
            </li>

            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
   
  );
}
