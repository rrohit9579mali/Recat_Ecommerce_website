import React from 'react';

function Footer() {
    return (
        <footer>
            <div className="f-info">
                <div className="f-social">
                    <a href="https://www.linkedin.com/in/rohit-mali47b142302/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="/facebook" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="/instagram" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://github.com/karpathy/ng-video-lecture" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github"></i>
                    </a>
                </div>
                <div className="footertext">
                    &copy; WanderLust Private Limited &nbsp;&nbsp;
                </div>
                <div className="f-info-links">
                    <a href="/privacy">Privacy</a>
                    <a href="/terms">Terms</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
