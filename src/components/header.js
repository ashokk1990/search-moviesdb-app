import React from 'react';
import logo from '../logo.svg'

const Header = () => {
    return (
        <table className="header">
            <tbody>
            <tr width="10px">
                <td>
                    <img src={logo} alt="pic"/>
                </td>
                <td>
                    <h2>Search App</h2>
                </td>
            </tr>
            </tbody>
        </table>
    )
}
export default Header