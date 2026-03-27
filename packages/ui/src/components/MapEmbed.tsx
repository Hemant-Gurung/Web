import "./MapEmbed.css";

interface MapEmbedProps {
  src: string;
  title?: string;
}

export function MapEmbed({ src, title = "Restaurant Location" }: MapEmbedProps) {
  return (
    <div className="ui-map-container">
      <iframe
        title={title}
        src={src}
        width="100%"
        height="340"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
