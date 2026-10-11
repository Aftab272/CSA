import React, { useEffect, useRef, useState } from 'react';

interface AdContainerProps {
  id: string;
  slot?: string; // Optional Google AdSense Ad Slot ID
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  responsive?: boolean;
  className?: string;
}

const ADSENSE_CLIENT_ID = 'ca-pub-9472065859777644';

const AdContainer: React.FC<AdContainerProps> = ({
  id,
  slot,
  format = 'auto',
  responsive = true,
  className = '',
}) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const isRequestedRef = useRef(false);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    if (isRequestedRef.current) return;

    // Trigger Google AdSense ad request once mounted
    const timer = setTimeout(() => {
      try {
        if (typeof window !== 'undefined' && adRef.current) {
          const status = adRef.current.getAttribute('data-ad-status');
          if (!status) {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
            isRequestedRef.current = true;
          }
        }
      } catch (e) {
        // Silently handle adblock or duplicate push
      }
    }, 150);

    // Watch for AdSense to fill the slot with an ad iframe or status attribute
    const el = adRef.current;
    let observer: MutationObserver | null = null;
    if (el) {
      observer = new MutationObserver(() => {
        const status = el.getAttribute('data-ad-status');
        const hasIframe = el.querySelector('iframe') !== null;
        if (status === 'filled' || hasIframe) {
          setIsFilled(true);
        } else if (status === 'unfilled') {
          setIsFilled(false);
        }
      });

      observer.observe(el, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ['data-ad-status', 'data-adsbygoogle-status'],
      });
    }

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, [id, slot]);

  return (
    <div
      id={id}
      className={`ad-container w-full text-center transition-all duration-300 ${
        isFilled ? 'my-6 sm:my-8 block opacity-100' : 'h-0 m-0 p-0 border-0 opacity-0 pointer-events-none overflow-hidden'
      } ${className}`}
      style={!isFilled ? { minHeight: 0, height: 0, padding: 0, margin: 0, border: 'none' } : undefined}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          textAlign: 'center',
        }}
        data-ad-client={ADSENSE_CLIENT_ID}
        {...(slot ? { 'data-ad-slot': slot } : {})}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
};

export default AdContainer;
