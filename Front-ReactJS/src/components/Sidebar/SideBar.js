import React from 'react'
import SideBarStyle from './SideBarStyle'

const SideBar = () => {

    return (
        <SideBarStyle>
            <div className="bodySideBar">
                <a href="/agenda/groupe_1">Groupe 1</a><br/>
                <a href="/agenda/groupe_2">Groupe 2</a><br/>
                <a href="/agenda/groupe_3">Groupe 3</a><br/>
            </div>
        </SideBarStyle>
    );
};

export default SideBar;