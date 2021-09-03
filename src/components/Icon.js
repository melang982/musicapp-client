function Icon({icon}) {

  switch (icon) {
    case 'play':
      return <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.55273 0.264591C1.47086 -0.355984 0.59375 0.152398 0.59375 1.39919V10.5999C0.59375 11.848 1.47086 12.3557 2.55273 11.7357L10.5946 7.12372C11.6769 6.50293 11.6769 5.49715 10.5946 4.8765L2.55273 0.264591Z" fill="white"/>
      </svg>;

    case 'pause':
      return <svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M1.9323 0.162766C2.61561 0.162766 3.16954 0.649172 3.16954 1.24919V9.50598C3.16954 10.106 2.61561 10.5924 1.9323 10.5924C1.249 10.5924 0.695068 10.106 0.695068 9.50598V1.24919C0.695068 0.649172 1.249 0.162766 1.9323 0.162766ZM6.36279 0.162766C7.0461 0.162766 7.60003 0.649172 7.60003 1.24919V9.50598C7.60003 10.106 7.0461 10.5924 6.36279 10.5924C5.67948 10.5924 5.12555 10.106 5.12555 9.50598V1.24919C5.12555 0.649172 5.67948 0.162766 6.36279 0.162766Z" fill="white"/>
      </svg>;

    case 'volume':
      return <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M14.0983 5.5C14.0981 7.44554 13.3195 9.31011 11.9361 10.6781L11.0256 9.71074C12.1323 8.59022 12.7466 7.07481 12.7327 5.5C12.7466 3.92519 12.1323 2.40978 11.0256 1.28926L11.9361 0.32193C13.3195 1.68989 14.0981 3.55446 14.0983 5.5ZM0.441895 3.67914H3.17318L6.8149 0.947851V10.0521L3.17318 7.32086H0.441895V3.67914ZM9.7169 8.402C10.4846 7.63162 10.9145 6.58759 10.9118 5.5C10.9145 4.41241 10.4846 3.36838 9.7169 2.598L8.74957 3.56534C9.26138 4.07892 9.54797 4.77494 9.54619 5.5C9.54797 6.22506 9.26138 6.92108 8.74957 7.43466L9.7169 8.402Z" fill="white"/>
      </svg>;

    case 'star':
      return <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M9.56381 11.1882L8.61488 7.10862L11.7809 4.36512L7.60732 4.00701L5.977 0.160767L4.34668 4.00701L0.173096 4.36512L3.33913 7.10862L2.39019 11.1882L5.977 9.02449L9.56381 11.1882Z" fill="white"/>
      </svg>;
    case 'search':
      return <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M10.4857 9.20227L13.5672 12.284C13.9903 12.7071 13.9903 13.3928 13.5675 13.816C13.3556 14.0274 13.0786 14.1326 12.8012 14.1326C12.5242 14.1326 12.2469 14.0274 12.0353 13.816L8.99046 10.771C8.11348 11.3822 7.04772 11.7419 5.89711 11.7419C2.90588 11.7419 0.481323 9.31759 0.481323 6.32625C0.481323 3.33502 2.90599 0.910461 5.89711 0.910461C8.88823 0.910461 11.3131 3.33502 11.3131 6.32625C11.3131 7.38355 11.0093 8.36874 10.4857 9.20227ZM2.2363 6.32648C2.2363 8.34831 3.87539 9.98729 5.89711 9.98729C7.91895 9.98729 9.55793 8.34831 9.55793 6.32648C9.55793 4.30464 7.91895 2.66555 5.89711 2.66555C3.87539 2.66555 2.2363 4.30464 2.2363 6.32648Z" fill="white"/>
      </svg>;
    case 'shuffle':
      return <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12.3017 1.82643V0.563843L15.8545 2.66816L12.3017 4.77247V3.50989H11.633C9.63885 3.50989 8.01035 4.5589 6.6912 6.71594C5.34234 9.04871 3.39464 10.2437 0.93296 10.2437H0.222412V8.56024H0.93296C2.92963 8.56024 4.43714 7.63533 5.52961 5.74637C7.11914 3.14672 9.16877 1.82643 11.633 1.82643H12.3017ZM12.3017 8.56024V7.29765L15.8545 9.40197L12.3017 11.5063V10.2437H11.633C9.67545 10.2437 7.97954 9.41053 6.56807 7.76473C6.60965 7.69673 6.6507 7.62771 6.6912 7.55766C6.93977 7.15121 7.19932 6.78409 7.47024 6.45593C8.63706 7.86932 10.0146 8.56024 11.633 8.56024H12.3017ZM5.52961 4.90465C5.66647 4.68082 5.80673 4.46648 5.95038 4.26165C4.66404 2.64906 2.97541 1.82643 0.93296 1.82643H0.222412V3.50989H0.93296C2.66124 3.50989 4.02303 4.20287 5.0664 5.6142C5.22842 5.39504 5.38277 5.15855 5.52961 4.90465Z" fill="#A1A4B2"/>
      </svg>;
    case 'repeat':
      return <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M7.3571 3.56284H11.4493V4.85592L14.7965 2.67982L11.4493 0.503723V1.82196H7.3571C3.13985 1.82196 0.849854 3.89209 0.849854 7.90246H2.33749C2.33749 4.96609 3.88978 3.56284 7.3571 3.56284ZM8.28924 10.5012H4.19705V9.20812L0.849854 11.3842L4.19705 13.5603V12.2421H8.28924C12.5065 12.2421 14.7965 10.172 14.7965 6.16158H13.3088C13.3088 9.09796 11.7566 10.5012 8.28924 10.5012Z" fill="#3B8BFD"/>
      </svg>;
    case 'previous':
      return <svg width="10" height="13" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M8.23836 0.899312C8.32828 0.848014 8.43052 0.820984 8.53462 0.820984C8.8594 0.820984 9.12268 1.0785 9.12268 1.39617V4.26264V6.58095V9.44742C9.12268 9.54925 9.09505 9.64924 9.0426 9.7372C8.87898 10.0116 8.51891 10.1043 8.23836 9.94428L2.34247 6.58095V9.0541C2.34247 9.58904 1.90881 10.0227 1.37387 10.0227C0.838925 10.0227 0.405268 9.58904 0.405268 9.0541V1.78959C0.405268 1.25464 0.838925 0.820984 1.37387 0.820984C1.90881 0.820984 2.34247 1.25464 2.34247 1.78959V4.26264L8.23836 0.899312Z" fill="#A1A4B2"/>
      </svg>;
    case 'next':
      return <svg width="10" height="13" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M1.2896 0.899312C1.19967 0.848014 1.09743 0.820984 0.993332 0.820984C0.668556 0.820984 0.405273 1.0785 0.405273 1.39617V4.26264V6.58095V9.44742C0.405273 9.54925 0.432909 9.64924 0.485355 9.7372C0.648978 10.0116 1.00905 10.1043 1.2896 9.94428L7.18548 6.58095V9.0541C7.18548 9.58904 7.61914 10.0227 8.15409 10.0227C8.68903 10.0227 9.12269 9.58904 9.12269 9.0541V1.78959C9.12269 1.25464 8.68903 0.820984 8.15409 0.820984C7.61914 0.820984 7.18548 1.25464 7.18548 1.78959V4.26264L1.2896 0.899312Z" fill="#A1A4B2"/>
      </svg>;
    default:
  }
}
export default Icon;
