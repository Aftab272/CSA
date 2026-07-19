import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Analytics: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // This is where you would initialize GA4, GTM, etc.
    // Example: window.gtag('config', 'G-XXXXXXXXXX', { page_path: location.pathname });
    console.log(`[Analytics] Page view tracked: ${location.pathname}`);
  }, [location]);

  return (
    <>
      {/* Google Analytics 4 Placeholder */}
      {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script> */}
      
      {/* Microsoft Clarity Placeholder */}
      {/* <script type="text/javascript">
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "XXXXXXXXXX");
      </script> */}
    </>
  );
};

export default Analytics;
