import React from 'react'
import { Menu } from 'antd'

function TeamLeftMenu(props) {
  return (
    <div>
        <Menu mode={props.mode}>
            <Menu.Item key="overview">
                <a href='/'>Overview</a>
            </Menu.Item>
            <Menu.Item key="squad">
                <a href='/'>Squad</a>
            </Menu.Item>
            <Menu.Item key="fixtures">
                <a href='/'>Fixtures</a>
            </Menu.Item>
            <Menu.Item key="results">
                <a href='/'>Results</a>
            </Menu.Item>
            <Menu.Item key="stats">
                <a href='/'>Stats</a>
            </Menu.Item>
            <Menu.Item key="stadium">
                <a href='/'>Stadium</a>
            </Menu.Item>
            <Menu.Item key="season_history">
                <a href='/'>Season History</a>
            </Menu.Item>
        </Menu>
    </div>
  )
}

export default TeamLeftMenu