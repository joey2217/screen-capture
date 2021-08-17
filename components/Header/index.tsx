import React, { memo } from 'react'
import { Menu } from 'antd'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Header: React.FC = () => {
    const route = useRouter()
    return (
        <header className="flex items-center shadow-sm">
            <div>
                <Link href="/">
                    <a className="text-black">
                        ScreenCapture
                    </a>
                </Link>
            </div>
            <Menu className="flex-grow" mode="horizontal" selectedKeys={[route.pathname]}>
                <Menu.Item key="/">
                    <Link href="/">
                        <a>
                            ScreenRecord
                        </a>
                    </Link>
                </Menu.Item>
            </Menu>
        </header>
    )
}

export default memo(Header)
