import React from 'react'

const Footer = () => {
    return (
        <footer>
            <ul className="l-footer">
                <a className="u-text__link-none" href="http://googlo.com" target="_blank" rel="noreferrer noopener">
                    <li>運営会社</li>
                </a>
                <a className="u-text__link-none" href="http://googlo.com" target="_blank" rel="noreferrer noopener">
                    <li>利用規約</li>
                </a>
                <a className="u-text__link-none" href="http://googlo.com" target="_blank" rel="noreferrer noopener">
                    <li>プライバシーポリシー</li>
                </a>
                <div className="u-text__link-none">
                    <li>Copyright &copy; 2020 IGA</li>
                </div>
            </ul>
        </footer>
    )
}

export default Footer
