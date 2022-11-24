import React from 'react'
const Sidebar = () => {
    return (
         <div class="sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{backgroundColor:"#e9ecef"}}>
            <ul class="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
                <li class="nav-item mb-2 mt-3"><a class="nav-link text-secondary" href="#"><h5>Admin Pannel</h5></a></li>
                <li class="nav-item mb-2 "><a class="nav-link text-secondary" href="#"><i class="fa fa-tachometer"></i> <span className="ml-3">Dashboard</span></a></li>
                <li class="nav-item mb-2">
                    <a class="nav-link text-secondary" href="#submenu1" data-toggle="collapse" data-target="#submenu1"><i class="far fa-file-word font-weight-bold"></i> <span className="ml-3"> Category▾</span></a>
                    <ul class="list-unstyled flex-column pl-3 collapse" id="submenu1" aria-expanded="false">
                       <li class="nav-item mb-2 "><a class="nav-link text-secondary" href=""><i class="fas fa-book-reader"></i> Company </a></li>
                       <li class="nav-item mb-2 "><a class="nav-link text-secondary" href=""> <i class="fas fa-book-medical"></i> Investor </a></li>
                    </ul>
                </li>
                <li class="nav-item mb-2"><a class="nav-link text-secondary" href="#"><i class="fa fa-building-o"></i> <span className="ml-3">Company</span></a></li>
                <li class="nav-item mb-2"><a class="nav-link text-secondary" href="#"><i class="fa-solid fa-people-group"></i><span className="ml-3">Investor</span></a></li>
                <li class="nav-item mb-2"><a class="nav-link text-secondary" href="#"><i class=""></i><span className="ml-3"></span></a></li>
                <li class="nav-item mb-2"><a class="nav-link text-secondary" href="#"><i class=""></i> <span className="ml-3"></span></a></li>
                <li class="nav-item mb-2"><a class="nav-link text-secondary" href="#"><i class=""></i> <span className="ml-3"></span></a></li>
             
            </ul>
       </div>
    )
}
 
export default Sidebar