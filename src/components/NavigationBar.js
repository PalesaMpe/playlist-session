function NavigationBar() {
  return (
    <nav class="navbar navbar-expand-sm">
      <a class="navbar-brand" href="#">
        <h1>PLAYLIST SESSION</h1>
      </a>

      <div
        class="collapse navbar-collapse justify-content-end"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">
              <h5>HOME</h5>
            </a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="#">
              <h5>ABOUT</h5>
            </a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="#">
              <h5>CONTACT</h5>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavigationBar;
