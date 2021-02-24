import React from "react";
import Link from "next/link";
import { MenuNode } from "../../driver/fetchAPI";

export interface HeaderProps {
    menu?: MenuNode,
    uri: string;
}

const Header: React.FC<HeaderProps> = ({
    menu,
    uri,
}) => {
    return <header>
        <div>LOGO</div>
        <div>
            <Link href="/">
                <a href="/">Home</a>
            </Link>
            {menu?.menuItems.nodes.length > 0
                ? <nav>
                    <ul>
                        {menu.menuItems.nodes.map(item => {
                            const active = item.path === uri || uri.indexOf(item.path) === 0;
                            return <li key={`header-menu-item-${item.path}`}>
                                <Link href={item.path}>
                                    <a href={item.path}>
                                        {item.label}
                                    </a>
                                </Link>
                            </li>
                        })}
                    </ul>
                </nav>
                : null}
        </div>
    </header>
}

export default Header;
