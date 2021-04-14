import React from "react";
import Link from "next/link";
import { MenuNode } from "../../../common/types/Menu";

interface Props {
    menu1?: MenuNode
    menu2?: MenuNode
    menu3?: MenuNode
    menu4?: MenuNode
}

const Footer: React.FC<Props> = ({
    menu1,
    menu2,
    menu3,
    menu4,
}) => {
    const today = new Date();

    return <footer>
        {menu1 ? <FooterMenu menu={menu1} /> : null}
        {menu2 ? <FooterMenu menu={menu2} /> : null}
        {menu3 ? <FooterMenu menu={menu3} /> : null}
        {menu4 ? <FooterMenu menu={menu4} /> : null}
    </footer>
}

const FooterMenu: React.FC<{ menu: MenuNode }> = ({
    menu
}) => {
    return <div>
        <h3>{menu.name}</h3>
        {menu && menu.menuItems.nodes.length > 0
            ? <ul>
                {menu.menuItems.nodes.map(item => {
                    return <li key={`footer-menu-${menu.slug}-${item.path}`}>
                        <Link href={item.path}>
                            <a href={item.path}>
                                {item.label}
                            </a>
                        </Link>
                    </li>
                })}
            </ul>
            : null}
    </div>
}

export default Footer;
