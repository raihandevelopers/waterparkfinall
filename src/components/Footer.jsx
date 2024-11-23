import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faWhatsapp, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLoggedIn"));
  const navigate = useNavigate();  // Using useNavigate hook

  const handleNavigate = () => {
    if (isLogin === 'true') {
      navigate('/UserDetails');  // Navigate to UserDetails when logged in
    } else {
      navigate('/sign-in');  // Navigate to sign-in if not logged in
    }

  }
  return (
    <>
      <div className="footer">

        <div className="fleft">
          <a href='/'>  <img src="https://newdemo.rreda.in/wp-content/uploads/2023/04/cropped-Untitled-design-1.png" alt="" /></a>
        </div>
        <div className="fm">
          <div className="fmcon">
            <NavLink to='/about'> <p>About us </p> </NavLink>
            <NavLink to='/'><p> Home</p> </NavLink>
            <NavLink to='/contact'><p> Contact</p> </NavLink>
          </div>
          <div className="fmcon">
          <NavLink to='/privacy-policy'> <p>Privacy Policy </p> </NavLink>
            <NavLink to='/refund'><p>Refund and Cancellation</p> </NavLink>
            <NavLink to='/terms-and-conditions'><p>Terms and Conditions</p> </NavLink>


          </div>
        </div>
        <div className="fright">

          <div className="frc">
            <div className='cinfo'>
              <div className="cleft">
                <img src="https://www.shutterstock.com/image-vector/call-icon-symbol-vector-mail-260nw-1189039696.jpg" alt="" />
              </div>
              <div className="cright">
                <div>Phone number</div>
                <div>918847714464</div>
              </div>

            </div>
            <div className='cinfo'>
              <div className="cleft">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/002/205/854/small/email-icon-free-vector.jpg" alt="" />
              </div>
              <div className="cright">
                <p>Email Address</p>
                <p>wpc@waterparkchalo.com</p>
              </div>

            </div>
            <div className='cinfo'>
              <div className="cleft">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAmTVkqizpykOy4P0YjBxJ9NKxQLYddy1FRA&s" alt="" />
              </div>
              <div className="cright">
                <p>Address</p>
                <p>110,Lakshmi Apt 1,Alkapuri, Nallasopara  491209</p>
              </div>

            </div>


          </div>
        </div>
      </div>
      <div className="fbottom">
        <div className="fbl">
          <p>© 2024 Water park chalo. All rights reserved.</p>
        </div>
        <div className="fbr pr-5">
          {/* <img src="data:image/png;base64,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" alt="" />
          <img src="data:image/jpeg;base64,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" alt="" />
          <img src="data:image/jpeg;base64,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" alt="" />
          <img src="data:image/png;base64,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" alt="" /> */}
          <div className="flex items-center space-x-4 p-2">
            <a href="https://www.facebook.com/" className="text-sm hover:text-gray-300">
              <FontAwesomeIcon icon={faFacebook} size="xl" />
            </a>
            <a href="https://wa.me/9146869202" className="text-sm hover:text-gray-300">
              <FontAwesomeIcon icon={faWhatsapp} size="xl" />
            </a>
            <a href="https://instagram.com/waterpark_chalo?igshid=OGQ5ZDc2ODk2ZA==" className="text-sm hover:text-gray-300">
              <FontAwesomeIcon icon={faInstagram} size="xl" />
            </a>
            <a href="https://www.youtube.com/@Waterparkchalo" className="text-sm hover:text-gray-300">
              <FontAwesomeIcon icon={faYoutube} size="xl" />
            </a>
          </div>

        </div>
      </div>


      <div className="fomo">
        <div className="fomoinfo">
          <NavLink to="/" className="fomoinfo">
            <img src="https://myresortbooking.in/public/images/icons/home.webp"
              style={{ width: "20px", height: "20px" }} alt="" />
            <div style={{ fontSize: "12px" }}>
              Home</div>
            </NavLink>
        </div>
        <div className="fomoinfo">
          <NavLink to="/farmvilla" className="fomoinfo"><img src="/waterpark.jpg" alt="" />
            <p style={{ fontSize: "12px" }}> Water Parks</p>
          </NavLink>
        </div>
        <div className="fomoinfo">
          <NavLink to="/influencers" className="fomoinfo"><img src="https://myresortbooking.in/public/images/icons/collab.webp" alt="" />
            <p style={{ fontSize: "12px" }}>Gallery</p>
          </NavLink>
        </div>
        <div className="fomoinfo">
          <NavLink to={isLogin?'/UserDetails':'sign-in'} onClick={handleNavigate} className="fomoinfo"> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAY1BMVEX///8AAACWlpYxMTFKSkri4uL8/PwpKSn39/e1tbWSkpLs7OxQUFDz8/PIyMjn5+fa2trQ0NA/Pz+np6e7u7uEhIRkZGQ6OjoTExOurq5eXl6dnZ1XV1d5eXlzc3MaGhohISEoVUfqAAAD3UlEQVR4nO2ZWZuqMAyG7QjIvoiKwLj8/195gEFlyTaDj5yLvNdt+dqkSRM2G0VRFEVRFEVRFEVRFOV/xQlir669OHDWVvIg8C7mycUL1tbTEPmFGVH4a8ty8rOZcc5XtWJwmktqOa14WPYW1mTMLl1NE2C6JyupStBz6s4qWUOT+01pMubbXUFUTWsyxv+8pvTOibp93q0unKYmun9aU8JrMubTvs56VMvXZzU5oURU+Nl0k+4kou6fdfWDRJMxh/d90U5TmxmSy0TVy7/UEMXHPqHt/IzwiKNM1BFfwcm+ehc4H+OI0uSN/PcUowMFUYoWFY8ePaGHDkz300VP2OEKRV2R6cnsHVYgdyIGbhQ2dpn57NnuG3cBzeLB68Im9GWi4Jycwe8wwIQZsu4OtCCygyklNBd9h832H6BJ34LeRbFMFHTMLpoMztOXPeG5ULAJAK+Ys4fqByLETe4FYmZ4Ay1XiSjo8gU3YsL4ZMnblANri+wHWY/MBaNduOTaeyjgCuxXANNwj+oY+i+zb+gCCu4fdPeYx+EwgzOxEFrdYYqZppyBcifzvBhGW6T6hoY+STlRYDJgou5pMLSSD31R0pPAwMltf3C6nClgUfSukaqPERUOPP1PJ0W6IvZokZ8UNxQt4NCgA4U2bh8tJ/lQ2D1aMjC5bjN0AuOIw+0zF5UoStx6JmtbE60Nm/7S8PkSkSO35BM6KUfBfV+SdXFUYF/pGKVZMr9yNckmKK9V2FBdS7avSJbW4xtF2e8sKSmdqEFSEJPtv0mdSBzVm/tMRHSbhh48UW7f3OklvGqW+FEDgsZLDhdrx2BdDuD7PsUMCBT5iAeCZWJO9mAHpwwGUWT/YOMIims3KAwG9LUeUUDGz6AqBYnQ2ez5bIGaRL2pByGkKrWmw85oi8CpR2cQwhnsV5qaVcBF8tEqRU1Fk+DwHHxCeiHCOvQF3LyIXi2O8MBecMeOPS9Gc4Ws4htioZ9M2i/Zb+hBCmvjIXhHiSGwUcZWFDaBhoyfYy7+pdGRRnm436Lsq3JwwlTqQri9ZjteZRFf+q6fumKqku4oXqHh95qMeU7OWIc892GdeQx23ON3iMokje4uiDJvwYeq/lzpAh+ht34gar63ydZlKpkH1+WihHekctEO3pT+r/ACUfzPuJ5M2r18JMwFoiS+2+FvZqkR47hUlLCj3KSADRsOHlRLRTEV74ub/IpbzjJRjtgmRkWpKBWlolSUilJRKkpFqSgVpaJUlIr6Yf9T5/5FVDfRkXdwN/mXDL/vPPvC8cOpPzMP0qnoD2hFURRFURRFURRFURRlCf8AqCtCWxlXkKYAAAAASUVORK5CYII=" alt="" />
            <p style={{ fontSize: "12px" }}> Profile</p>
          </NavLink>
        </div>
      </div>

    </>
  )
}

export default Footer