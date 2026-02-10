import { siteConfig } from '../../config/site';

export default function GoogleMapEmbed() {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg border">
      <iframe
        src={siteConfig.googleMapsEmbedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ini-Abasi Restaurant Location"
      />
    </div>
  );
}
