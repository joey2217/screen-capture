import React, { memo } from 'react'
import { Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'

const Header: React.FC = () => {
    const location = useLocation()
    return (
        <header className="flex">
            <Menu className="flex-grow" mode="horizontal" selectedKeys={[location.pathname]}>
                <Menu.Item key="/">
                    <Link to="/">
                        ScreenRecord
                    </Link>
                </Menu.Item>
                {/* <Menu.Item key="/share">
                    <Link to="/share">
                        ScreenShare
                    </Link>
                </Menu.Item> */}
            </Menu>
        </header>
    )
}

export default memo(Header)
